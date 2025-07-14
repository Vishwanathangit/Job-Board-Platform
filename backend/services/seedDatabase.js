const Job = require("../models/Job");
const dummyJobs = require("../data/dummyJobs.json");

const seedDatabase = async () => {
  try {
    await Job.bulkCreate(dummyJobs);
    console.log("Dummy jobs seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedDatabase;