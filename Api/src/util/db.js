const Sequilize = require("sequelize");

const sequelize = new Sequilize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
  }
);

module.exports = sequelize;
