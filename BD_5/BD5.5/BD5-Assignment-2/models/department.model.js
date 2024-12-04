const { DataTypes, sequelize } = require("../lib");

const Department = sequelize.define("Department", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Department;
