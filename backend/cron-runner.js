const { scheduleCronJobs } = require('./services/cron-job');
const sequelize = require('./config/database');

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
    scheduleCronJobs();
  } catch (err) {
    console.error("DB connection failed", err);
  }
})();
