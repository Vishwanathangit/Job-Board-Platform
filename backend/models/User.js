const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("candidate", "employer", "admin"),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeCreate: async (user) => {
        user.email = user.email.toLowerCase().trim();
      },
      beforeUpdate: async (user) => {
        user.email = user.email.toLowerCase().trim();
      },
      afterCreate: async (user) => {
        const { logActivity } = require("../services/loggerService");
        await logActivity(user.id, "user_created", `User ${user.email} created with role ${user.role}`);
      },
      afterUpdate: async (user) => {
        const { logActivity } = require("../services/loggerService");
        if (user.changed("role")) {
          await logActivity(user.id, "role_updated", `User ${user.email} role changed to ${user.role}`);
        }
      },
    },
  }
);

User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;