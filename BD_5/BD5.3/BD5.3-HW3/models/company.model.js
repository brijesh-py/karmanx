const { DataTypes, sequelize } = require("../lib");

const Company = sequelize.define("companies", {
  name: DataTypes.TEXT,
  industry: DataTypes.TEXT,
  headquarters: DataTypes.TEXT,
  foundedYear: DataTypes.INTEGER,
  revenue: DataTypes.INTEGER,
});

module.exports = Company;
