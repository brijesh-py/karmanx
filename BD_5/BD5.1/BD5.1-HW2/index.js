const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./lib");
const Employee = require("./models/employee.model");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// ERROR HANDLING
class HttpError extends Error {
  constructor({
    status = HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR,
    message = "An error occurred",
  }) {
    super(message);
    this.status = status;
  }
}

const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    console.log(error);
    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred",
      });
    }
  }
};

// Dummy Data
const employees = [
  {
    name: "Alice Johnson",
    department: "Finance",
    salary: 70000,
    designation: "Senior Analyst",
  },
  {
    name: "Bob Smith",
    department: "IT",
    salary: 85000,
    designation: "Software Engineer",
  },
  {
    name: "Catherine Lee",
    department: "Marketing",
    salary: 60000,
    designation: "Content Strategist",
  },
  {
    name: "David Brown",
    department: "HR",
    salary: 50000,
    designation: "HR Manager",
  },
  {
    name: "Emily Davis",
    department: "Operations",
    salary: 75000,
    designation: "Operations Lead",
  },
];

// Routes
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Employee.bulkCreate(employees);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
