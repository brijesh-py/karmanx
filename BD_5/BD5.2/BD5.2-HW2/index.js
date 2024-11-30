const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./lib");
const Employee = require("./models/employee.model");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// EMPLOYEE ROUTER
const employeeRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/employees", employeeRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
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

// RESPONSE
const responseEmployees = (res, employees) => {
  if (employees?.length == 0 || !employees) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: "No employees found",
    });
  }
  res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
    status: HTTPS_STATUS_CODES?.RESPONSE_OK,
    employees,
  });
};

// Dummy Data
const employeesData = [
  {
    name: "Johnson",
    department: "Finance",
    salary: 70000,
    designation: "Senior Analyst",
  },
  {
    name: "Smith",
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
  {
	  name: 'Alice',
	  salary: 60000,
	  department: 'Engineering',
	  designation: 'Software Engineer'
	},
	{
    'name': 'Bob',
    'salary': 70000,
    'department': 'Marketing',
    'designation': 'Marketing Manager'
  },
	{
	  name: 'Charlie',
	  salary: 80000,
	  department: 'Engineering',
	  designation: 'Senior Software Engineer'
	}
];

// CONTROLLERS
// Exercise 1: Fetch all employees
const getEmployees = (req, res) => {
  errorHandler(res, async () => {
    const employees = await Employee.findAll();
    responseEmployees(res, employees);
  });
};

// Exercise 2: Fetch employee details by ID
const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const employee = await Employee.findAll({ where: { id } });
    responseEmployees(res, ...employee);
  });
};

// Exercise 3: Fetch all employees by (PROP)
const getEmployeesByProps = (key) => {
  return (req, res) => {
    const value = req.params[key];
    errorHandler(res, async () => {
      const employees = await Employee.findAll({
        where: { [key]: value },
      });
      responseEmployees(res, employees);
    });
  };
};

// Exercise 4: Sort all the employees by (PROP)
const getSortedEmployeesByProps = (key) => {
  return (req, res) => {
    const reKey = key?.replace("-", "_");
    const order = req.query?.order == "asc" ? "asc" : "desc";
    errorHandler(res, async () => {
      const employees = await Employee.findAll({
        order: [[reKey, order]],
      });
      responseEmployees(res, employees);
    });
  };
};

// ROUTES
employeeRouter.get("/", getEmployees);
employeeRouter.get("/details/:id", getEmployeeById);
employeeRouter.get(
  "/department/:department",
  getEmployeesByProps("department")
);
employeeRouter.get("/sort/:salary", getSortedEmployeesByProps("salary"));

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Employee.bulkCreate(employeesData);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
