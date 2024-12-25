const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const user = sequelize.define("user", {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = user;
