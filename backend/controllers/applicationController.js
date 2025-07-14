const { applicationSchema } = require("../utils/validators");
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const { logger, logActivity } = require("../services/loggerService");

const createApplication = async (req, res, next) => {
  try {
    const { error } = applicationSchema.safeParse(req.body);
    if (error) throw new Error(error.details[0].message);

    const job = await Job.findByPk(req.body.job);
    if (!job) throw new Error("Job not found");

    const existingApplication = await Application.findOne({
      where: { userId: req.user.id, jobId: req.body.job },
    });
    if (existingApplication)
      throw new Error("You have already applied for this job");

    const application = await Application.create({
      userId: req.user.id,
      jobId: req.body.job,
      coverLetter: req.body.coverLetter,
      status: "accepted",
    });

    await logActivity(req.user.id, "apply_job", `Applied to job ${job.title}`);

    res.status(201).json({ application, message: "Thank you for submitting your application!" });
  } catch (error) {
    next(error);
  }
};

const getApplicationsByUser = async (req, res, next) => {
  try {
    const applications = await Application.findAll({
      where: { userId: req.params.userId },
      include: [
        { model: User, as: "candidate", attributes: ["id", "name", "email"] },
        { model: Job, as: "job" },
      ],
    });

    res.json({ applications });
  } catch (error) {
    next(error);
  }
};

const getApplicationsByJob = async (req, res, next) => {
  try {
    const jobId = parseInt(req.params.jobId);
    if (isNaN(jobId)) throw new Error("Invalid job ID");

    const job = await Job.findByPk(jobId);
    if (!job) throw new Error("Job not found");

   
    logger.info(`Fetching applications for job ${jobId} by user ${req.user.id} (role: ${req.user.role})`);

    if (job.userId !== req.user.id && req.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const applications = await Application.findAll({
      where: { jobId },
      include: [
        { model: User, as: "candidate", attributes: ["id", "name", "email"] },
      ],
    });

    logger.info(`Found ${applications.length} applications for job ${jobId}`);

    if (applications.length === 0) {
      return res.json({ applications: [], message: "No applications found for this job" });
    }

    res.json({ applications });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplicationsByUser,
  getApplicationsByJob,
};