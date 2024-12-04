const { sequelize, DataTypes } = require("../lib");
const Role = require("./role.model");
const Department = require("./department.model");

const Employee = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: "id",
    },
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Department,
      key: "id",
    },
  },
});

module.exports = Employee;
