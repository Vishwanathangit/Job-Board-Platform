const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const env = process.env.NODE_ENV || "development";

let sequelize;

if (env === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  sequelize = new Sequelize({
    database: "jobboard",
    username: "postgres",
    password: process.env.DATABASE_PASSWORD,
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  });
}

module.exports = sequelize;