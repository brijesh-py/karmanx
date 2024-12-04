const { DataTypes, sequelize } = require("../lib");
const Customer = require("./customer.model");
const Agent = require("./agent.model");

const Ticket = sequelize.define("Ticket", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: DataTypes.STRING,
  priority: DataTypes.INTEGER,
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer,
      key: "id",
    },
  },
  agentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Agent,
      key: "id",
    },
  },
});

module.exports = Ticket;
