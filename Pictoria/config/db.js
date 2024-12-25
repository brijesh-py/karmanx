const sq = require("sequelize");
const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  // logging: false,
  pool: {
    max: 1, // Ensure only one connection is used at a time
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
