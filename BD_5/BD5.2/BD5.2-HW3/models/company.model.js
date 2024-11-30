const { DataTypes, sequelize } = require("../lib");

const Company = sequelize.define("employees", {
  name: DataTypes.TEXT,
  industry: DataTypes.TEXT,
  headquarters: DataTypes.TEXT,
  revenue: DataTypes.INTEGER,
  foundedYear: DataTypes.INTEGER,
});

module.exports = Company;
