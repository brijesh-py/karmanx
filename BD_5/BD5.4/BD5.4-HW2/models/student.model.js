const { DataTypes, sequelize } = require("../lib");

const Student = sequelize.define("students", {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
});

module.exports = Student;
