const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.ENUM("full-time", "part-time", "remote"),
    allowNull: false,
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },
}, {
  hooks: {
    beforeCreate: async (job) => {
      job.title = job.title.trim();
      job.company = job.company.trim();
    },
    beforeUpdate: async (job) => {
      job.title = job.title.trim();
      job.company = job.company.trim();
    },
    afterUpdate: async (job) => {
      const { logActivity } = require("../services/loggerService");
      if (job.changed("status")) {
        await logActivity(job.userId, "job_status_updated", `Job ${job.title} status changed to ${job.status}`);
      }
    },
    afterDestroy: async (job) => {
      const { logActivity } = require("../services/loggerService");
      await logActivity(job.userId, "job_deleted", `Job ${job.title} deleted`);
    },
  },
});

Job.belongsTo(User, { foreignKey: "userId", as: "employer" });

module.exports = Job;