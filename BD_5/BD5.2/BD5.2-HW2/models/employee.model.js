const { DataTypes, sequelize } = require("../lib");

const Employee = sequelize.define("employees", {
  name: DataTypes.TEXT,
  department: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
  designation: DataTypes.TEXT,
});

module.exports = Employee;
