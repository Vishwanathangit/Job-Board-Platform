const cron = require('node-cron');
const Job = require('../models/Job');
const User = require('../models/User');
const { logger } = require('./loggerService');
const dummyJobs = require('../data/dummyJobs.json');

const scheduleCronJobs = () => {
  console.log('scheduleCronJobs function called');

  cron.schedule('* * * * *', async () => {
    console.log('Cron job triggered');

    try {
      const userId = '550e8400-e29b-41d4-a716-446655440000';

      // Ensure dummy user exists
      await User.findOrCreate({
        where: { id: userId },
        defaults: {
          name: 'Dummy Recruiter',
          email: 'dummy@jobboard.com',
          password: 'Dummy@123', // Hash properly if necessary
          role: 'employer'
        }
      });

      const jobCount = await Job.count();
      console.log('Job count:', jobCount);

      if (jobCount < 100) {
        const jobsToCreate = dummyJobs.slice(0, 100 - jobCount);
        const jobsWithUser = jobsToCreate.map(job => ({
          ...job,
          userId
        }));

        await Job.bulkCreate(jobsWithUser);
        logger.info(`Cron job: Added ${jobsWithUser.length} dummy jobs`);
      }

      logger.info('Cron job: Job count check completed');
    } catch (error) {
      logger.error('Cron job error:', error.message || error);
    }
  });
};

module.exports = { scheduleCronJobs };
