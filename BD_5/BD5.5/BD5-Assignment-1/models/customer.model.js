const { DataTypes, sequelize } = require("../lib");

const Customer = sequelize.define("Customer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Customer;
