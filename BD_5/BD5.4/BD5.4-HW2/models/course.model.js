const { DataTypes, sequelize } = require("../lib");

const Course = sequelize.define("courses", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
});

module.exports = Course;
