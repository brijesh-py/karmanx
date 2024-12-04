const { sequelize, DataTypes } = require("../lib");
const Customer = require("./customer.model");
const Ticket = require("./ticket.model");

const TicketCustomer = sequelize.define("TicketCustomer", {
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer,
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

Ticket.belongsToMany(Customer, {
  through: TicketCustomer,
  as: "customers",
  foreignKey: "ticketId",
  otherKey: "customerId",
});

Customer.belongsToMany(Ticket, {
  through: TicketCustomer,
  as: "tickets",
  foreignKey: "customerId",
  otherKey: "ticketId",
});

module.exports = TicketCustomer;
