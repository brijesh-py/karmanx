const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  dialectOptions: {
    pragma: {
      journal_mode: "WAL", // WAL mode for better concurrency
    },
    timeout: 10000, // Increase timeout if necessary
  },
});

module.exports = sequelize;
