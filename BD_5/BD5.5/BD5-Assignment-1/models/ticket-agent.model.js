const { sequelize, DataTypes } = require("../lib");
const Agent = require("./agent.model");
const Ticket = require("./ticket.model");

const TicketAgent = sequelize.define("TicketAgent", {
  agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Agent,
      key: "id",
    },
  },
  ticketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ticket,
      key: "id",
    },
  },
});

Ticket.belongsToMany(Agent, { 
  through: TicketAgent, 
  as: 'agents', 
  foreignKey: 'ticketId', 
  otherKey: 'agentId' 
});

Agent.belongsToMany(Ticket, { 
  through: TicketAgent, 
  as: 'tickets', 
  foreignKey: 'agentId', 
  otherKey: 'ticketId' 
});

module.exports = TicketAgent;
