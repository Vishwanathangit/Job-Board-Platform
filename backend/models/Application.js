const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Job = require("./Job");

const Application = sequelize.define("Application", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending",
  },
}, {
  hooks: {
    beforeCreate: async (application) => {
      application.coverLetter = application.coverLetter.trim();
    },
    afterCreate: async (application) => {
      const { logActivity } = require("../services/loggerService");
      const job = await Job.findByPk(application.jobId);
      await logActivity(application.userId, "application_created", `Applied to job ${job.title}`);
    },
    afterUpdate: async (application) => {
      const { logActivity } = require("../services/loggerService");
      if (application.changed("status")) {
        const job = await Job.findByPk(application.jobId);
        await logActivity(application.userId, "application_status_updated", `Application for job ${job.title} status changed to ${application.status}`);
      }
    },
  },
});

Application.belongsTo(User, { foreignKey: "userId", as: "candidate" });
Application.belongsTo(Job, { foreignKey: "jobId", as: "job" });

module.exports = Application;