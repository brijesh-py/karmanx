const sq = require("sequelize");
const config = require("../config/config").development;

const sequelize = new sq.Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
  }
);

module.exports = sequelize;
