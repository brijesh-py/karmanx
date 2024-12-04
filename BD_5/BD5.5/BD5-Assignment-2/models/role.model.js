const { DataTypes, sequelize } = require("../lib");

const Role = sequelize.define("Role", {
  title: DataTypes.STRING,
});

module.exports = Role;
