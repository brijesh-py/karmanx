const { sequelize, DataTypes } = require("../lib");
const Role = require("./role.model");
const Employee = require("./employee.model");

const EmployeeRole = sequelize.define("EmployeeRole", {
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "id",
    },
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "id",
    },
  },
});

Employee.belongsToMany(Role, {
  through: EmployeeRole,
  as: "role",
  foreignKey: "employeeId",
  otherKey: "roleId",
});

Role.belongsToMany(Employee, {
  through: EmployeeRole,
  as: "employees",
  foreignKey: "roleId",
  otherKey: "employeeId",
});

module.exports = EmployeeRole;
