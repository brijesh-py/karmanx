const { DataType, sequelize } = require("../lib");

const Employee = sequelize.define("employees", {
  name: DataType.TEXT,
  department: DataType.TEXT,
  salary: DataType.INTEGER,
  designation: DataType.TEXT,
});

module.exports = Employee;
