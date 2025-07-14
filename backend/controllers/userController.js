const User = require("../models/User");
const { logger } = require("../services/loggerService");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new Error("User not found");

    await user.destroy();
    await logger.logActivity(
      req.user.id,
      "delete_user",
      `User ${user.email} deleted`
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
