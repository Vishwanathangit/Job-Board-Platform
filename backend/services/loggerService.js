const winston = require('winston');
const ActivityLog = require('../models/ActivityLog');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

const logActivity = async (userId, action, details) => {
  await ActivityLog.create({ userId, action, details });
  logger.info(`${action}: ${details}`, { userId });
};

module.exports = { logger, logActivity };
