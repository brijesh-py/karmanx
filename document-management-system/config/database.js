const sq = require("sequelize");
const config = require("./config")?.development;

const sequelize = new sq.Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "postgres",
    port: config.port,
  }
);

module.exports = sequelize;
