const { jobSchema } = require("../utils/validators");
const Job = require("../models/Job");
const User = require("../models/User");
const { logger, logActivity } = require("../services/loggerService");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const getAllJobs = async (req, res, next) => {
  try {
    const { search, location, jobType, salaryRange, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) where.title = { [Op.iLike]: `%${search}%` };
    if (location) where.location = location;
    if (jobType) where.jobType = jobType;
    if (salaryRange) {
      const [min, max] = salaryRange.split("-").map(Number);
      where.salary = max ? { [Op.between]: [min, max] } : { [Op.gte]: min };
    }

    const jobs = await Job.findAll({
      where,
      // limit: parseInt(limit),
      // offset: parseInt(offset),
      include: [{ model: User, as: "employer", attributes: ["id", "name"] }],
    });

    res.json({ jobs });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [{ model: User, as: "employer", attributes: ["id", "name"] }],
    });
    if (!job) throw new Error("Job not found");

    res.json({ job });
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const jobsFilePath = path.join(__dirname, '../data/dummyjobs.json')
    const result = jobSchema.safeParse(req.body);
    if (!result.success) throw new Error(result.error.errors[0].message);

    // Step 2: Append job to JSON
    const jobData = { ...req.body, userId: req.user.id };
    let jobs = [];

    if (fs.existsSync(jobsFilePath)) {
      jobs = JSON.parse(fs.readFileSync(jobsFilePath, 'utf-8'));
    }

    jobs.push(jobData);
    fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2));

    // Step 3: Insert into DB
    const job = await Job.create(jobData);

    // Step 4: Log activity (optional)
    await logActivity(req.user.id, 'create_job', `Job "${job.title}" created`);

    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const result = jobSchema.safeParse(req.body);
    if (!result.success) throw new Error(result.error.errors[0].message);

    const job = await Job.findByPk(req.params.id);
    if (!job) throw new Error("Job not found");
    if (job.userId !== req.user.id && req.user.role !== "admin")
      throw new Error("Unauthorized");

    await job.update(req.body);
    await logActivity(req.user.id, "update_job", `Job ${job.title} updated`);

    res.json({ job });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) throw new Error("Job not found");
    if (job.userId !== req.user.id && req.user.role !== "admin")
      throw new Error("Unauthorized");

    await job.destroy();
    await logActivity(req.user.id, "delete_job", `Job ${job.title} deleted`);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const approveJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) throw new Error("Job not found");
    if (job.status === "approved") throw new Error("Job already approved");

    await job.update({ status: "approved" });
    await logActivity(req.user.id, "approve_job", `Job ${job.title} approved`);

    res.json({ job });
  } catch (error) {
    next(error);
  }
};

const getJobApplicationsCount = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) throw new Error("Job not found");
    if (job.userId !== req.user.id && req.user.role !== "admin")
      throw new Error("Unauthorized");

    const count = await Application.count({
      where: { jobId: req.params.id },
    });

    res.json({ count });
  } catch (error) {
    next(error);
  }
};

const seedJobs = async (req, res, next) => {
  try {
    const dummyJobsPath = path.join(__dirname, "../data/dummyJobs.json");
    const dummyJobsData = await fs.readFile(dummyJobsPath, "utf-8");
    const dummyJobs = JSON.parse(dummyJobsData);

    for (const jobData of dummyJobs) {
      const result = jobSchema.safeParse(jobData);
      if (!result.success) {
        console.error(`Validation error for job ${jobData.title}:`, result.error.errors);
        continue;
      }

      const existingJob = await Job.findOne({
        where: { title: jobData.title, company: jobData.company },
      });

      if (!existingJob) {
        await Job.create(jobData);
      }
    }

    await logActivity(req.user.id, "seed_jobs", "Dummy jobs seeded into database");
    res.status(200).json({ message: "Dummy jobs seeded successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  approveJob,
  getJobApplicationsCount,
  seedJobs,
};