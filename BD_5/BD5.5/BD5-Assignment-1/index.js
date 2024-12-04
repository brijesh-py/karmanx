const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  Ticket,
  Customer,
  Agent,
  TicketCustomer,
  TicketAgent,
} = require("./models");
const { HttpError, errorHandler } = require("./utils/error-handler");
const response = require("./utils/response");
const { HTTPS_STATUS_CODES } = require("./constants");
const { sequelize } = require("./lib");

// Server Initializing
const app = express();
const PORT = 3000;

// Router
const ticketRouter = express.Router();

// Middlewares
app.use(cors());
app.use(bodyParser());
app.use("/tickets", ticketRouter);

// Check ID
const checkIds = async (Model, id, key) => {
  const isExist = await Model.findOne({ where: { id } });
  if (!isExist) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES.NOT_FOUND,
      message: `${key} ID is not found`,
    });
  }
  return isExist;
};

// Validate Ticket
const validateTicket = (req, res, next) => {
  const { title, description, status } = req.body;
  const priority = parseInt(req.body?.priority);
  const customerId = parseInt(req.body?.customerId);
  const agentId = parseInt(req.body?.agentId);
  errorHandler(res, async () => {
    if (
      !title ||
      !description ||
      !status ||
      isNaN(priority) ||
      isNaN(customerId) ||
      isNaN(agentId)
    ) {
      throw new HttpError({ message: "Ticket fields are required" });
    }
    await checkIds(Customer, customerId, "Customer");
    await checkIds(Agent, agentId, "Agent");
    next();
  });
};

// Controllers

// Exercise 1: Get All Tickets
const getTickets = (req, res) => {
  errorHandler(res, async () => {
    let tickets = await Ticket.findAll({
      limit: 20,
    });
    if (tickets?.length == 0 || !tickets) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES.NOT_FOUND,
        message: "No Tickets found",
      });
    }

    response({ res, status: HTTPS_STATUS_CODES.OK, tickets });
  });
};

// Exercise 2: Get Ticket by ID
const getTicketById = (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(id)) {
      throw new HttpError({ message: "Ticket ID expected as a number." });
    }
    const ticket = await Ticket.findOne({ where: { id } });
    if (!ticket) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES.NOT_FOUND,
        message: "No Ticket found.",
      });
    }
    response({ res, status: HTTPS_STATUS_CODES.OK, ticket });
  });
};

// Exercise 3: Get Tickets by Status
const getTicketsByStatus = (req, res) => {
  const status = req.params.status;
  errorHandler(res, async () => {
    const tickets = await Ticket.findAll({ where: { status } });
    if (tickets?.length == 0 || !tickets) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES.NOT_FOUND,
        message: "No Tickets found.",
      });
    }
    response({ res, status: HTTPS_STATUS_CODES.OK, tickets });
  });
};

// Exercise 4: Get Tickets Sorted by (PROP)
const getTicketSortedByProp = (key) => {
  return (req, res) => {
    const order = req.req?.order == "desc" ? "desc" : "asc";
    errorHandler(res, async () => {
      const tickets = await Ticket.findAll({
        order: [[key, order]],
      });
      if (tickets?.length == 0 || !tickets) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES.NOT_FOUND,
          message: "No Tickets found.",
        });
      }
      response({ res, status: HTTPS_STATUS_CODES.OK, tickets });
    });
  };
};

// Exercise 5: Add a New Ticket
const createTicket = (req, res) => {
  const { title, description, status } = req.body;
  const priority = parseInt(req.body?.priority);
  const customerId = parseInt(req.body?.customerId);
  const agentId = parseInt(req.body?.agentId);
  errorHandler(res, async () => {
    const ticket = {
      title,
      description,
      status,
      priority,
      customerId,
      agentId,
    };
    const createdTicket = await Ticket.create(ticket);
    response({
      res,
      status: HTTPS_STATUS_CODES.CREATE,
      message: "Ticket created successfully",
      ticket: createdTicket,
    });
  });
};

// Exercise 6: Update Ticket Details
const updateTicket = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;
  const priority = parseInt(req.body?.priority);
  const customerId = parseInt(req.body?.customerId);
  const agentId = parseInt(req.body?.agentId);
  errorHandler(res, async () => {
    const ticket = {
      title,
      description,
      status,
      priority,
      customerId,
      agentId,
    };
    const updatedTicket = await Ticket.update(ticket, { where: { id } });
    response({
      res,
      status: HTTPS_STATUS_CODES.CREATE,
      message: "Ticket updated successfully",
      ticket,
    });
  });
};

// Exercise 7: Delete a Ticket
const deleteTicket = (req, res) => {
  const id = req.params.id;
  errorHandler(res, async () => {
    if (isNaN(id)) {
      throw new HttpError({ message: "Ticket ID expected as a number." });
    }
    const isDeleted = await Ticket.destroy({ where: { id } });
    if (!isDeleted) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES.NOT_FOUND,
        message: "No Ticket found.",
      });
    }
    const message = `Ticket with ID ${id} deleted successfully.`;
    response({
      res,
      status: HTTPS_STATUS_CODES.OK,
      message,
    });
  });
};

// Routes
ticketRouter.get("/", getTickets);
ticketRouter.get("/details/:id", getTicketById);
ticketRouter.get("/status/:status", getTicketsByStatus);
ticketRouter.get("/sort-by-priority", getTicketSortedByProp("priority"));
ticketRouter.post("/new", validateTicket, createTicket);
ticketRouter.put("/update/:id", validateTicket, updateTicket);
ticketRouter.delete("/delete/:id", deleteTicket);

// Data Seeding
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  let customers = await Customer.bulkCreate([
    { customerId: 1, name: "Alice", email: "alice@example.com" },
    { customerId: 2, name: "Bob", email: "bob@example.com" },
  ]);

  let agents = await Agent.bulkCreate([
    { agentId: 1, name: "Charlie", email: "charlie@example.com" },
    { agentId: 2, name: "Dave", email: "dave@example.com" },
  ]);

  let tickets = await Ticket.bulkCreate([
    {
      title: "Login Issue",
      description: "Cannot login to account",
      status: "open",
      priority: 1,
      customerId: 1,
      agentId: 1,
    },
    {
      title: "Payment Failure",
      description: "Payment not processed",
      status: "closed",
      priority: 2,
      customerId: 2,
      agentId: 2,
    },
    {
      title: "Bug Report",
      description: "Found a bug in the system",
      status: "open",
      priority: 3,
      customerId: 1,
      agentId: 1,
    },
  ]);

  await TicketCustomer.bulkCreate([
    { ticketId: tickets[0].id, customerId: customers[0].id },
    { ticketId: tickets[2].id, customerId: customers[0].id },
    { ticketId: tickets[1].id, customerId: customers[1].id },
  ]);

  await TicketAgent.bulkCreate([
    { ticketId: tickets[0].id, agentId: agents[0].id },
  ]);

  return res.json({ message: "Database seeded successfully" });
});

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
