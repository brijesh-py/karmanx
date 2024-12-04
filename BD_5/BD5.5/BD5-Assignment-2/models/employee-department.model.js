const { sequelize, DataTypes } = require("../lib");
const Employee = require("./employee.model");
const Department = require("./department.model");

const EmployeeDepartment = sequelize.define("EmployeeDepartment", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "id",
    },
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: "id",
    },
  },
});

Department.belongsToMany(Employee, {
  through: EmployeeDepartment,
  as: "employees",
  foreignKey: "departmentId",
  otherKey: "employeeId",
});

Employee.belongsToMany(Department, {
  through: EmployeeDepartment,
  as: "department",
  foreignKey: "employeeId",
  otherKey: "departmentId",
});

module.exports = EmployeeDepartment;
