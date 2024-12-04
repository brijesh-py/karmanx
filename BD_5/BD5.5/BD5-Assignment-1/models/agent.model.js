const { sequelize, DataTypes } = require("../lib");

const Agent = sequelize.define("Agent", {
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

module.exports = Agent;
