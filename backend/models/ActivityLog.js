const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const ActivityLog = sequelize.define("ActivityLog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (log) => {
      log.action = log.action.trim();
      log.details = log.details.trim();
    },
  },
});

ActivityLog.belongsTo(User, { foreignKey: "userId" });

module.exports = ActivityLog;