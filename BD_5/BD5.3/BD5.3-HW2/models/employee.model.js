const { DataTypes, sequelize } = require("../lib");

const Employee = sequelize.define("employees", {
  name: DataTypes.TEXT,
  designation: DataTypes.TEXT,
  department: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
});

module.exports = Employee;
