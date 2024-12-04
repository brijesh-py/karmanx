const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
app.use("/employees", employeeRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
// RESPONSE MESSAGES
const MESSAGES = {
  FETCH_RESOURCE: "Employees retrieved successfully.",
  CREATE_RESOURCE: "Employee created successfully.",
  UPDATE_EMPLOYEE: "Employee updated successfully.",
  DELETE_EMPLOYEE: "Employee deleted successfully.",
  REQUIRED: "Required field is missing.",
  NOT_FOUND: "Resource not found.",
  BAD_REQUEST: "Invalid request. Please check your input.",
  INTERNAL_SERVER: "An internal server error occurred. Please try again later.",
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
    if (process.env.ENV === "development") {
      console.log(error);
    }
    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: MESSAGES?.INTERNAL_SERVER,
      });
    }
  }
};

// RESPONSE
const responseEmployees = ({
  res,
  employees,
  status = HTTPS_STATUS_CODES?.RESPONSE_OK,
  message = MESSAGES?.FETCH_RESOURCE,
}) => {
  if (employees?.length == 0 || !employees) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: MESSAGES?.NOT_FOUND,
    });
  }
  res.status(status).json({
    message,
    status,
    employees,
  });
};

// Dummy Data
const employeeData = [
  {
    id: 1,
    name: "John Doe",
    designation: "Manager",
    department: "Sales",
    salary: 90000,
  },
  {
    id: 2,
    name: "Anna Brown",
    designation: "Developer",
    department: "Engineering",
    salary: 80000,
  },
  {
    id: 3,
    name: "James Smith",
    designation: "Designer",
    department: "Marketing",
    salary: 70000,
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
  },
  {
    id: 5,
    name: "Michael Wilson",
    designation: "Developer",
    department: "Engineering",
    salary: 85000,
  },
  {
    id: 6,
    name: "Sarah Johnson",
    designation: "Data Analyst",
    department: "Data Science",
    salary: 75000,
  },
  {
    id: 7,
    name: "David Lee",
    designation: "QA Engineer",
    department: "Quality Assurance",
    salary: 70000,
  },
  {
    id: 8,
    name: "Linda Martinez",
    designation: "Office Manager",
    department: "Administration",
    salary: 50000,
  },
  {
    id: 9,
    name: "Robert Hernandez",
    designation: "Product Manager",
    department: "Product",
    salary: 95000,
  },
  {
    id: 10,
    name: "Karen Clark",
    designation: "Sales Associate",
    department: "Sales",
    salary: 55000,
  },
];

// CONTROLLERS
// Exercise 1: Fetch all employees
const getEmployees = (req, res) => {
  errorHandler(res, async () => {
    const employees = await Employee.findAll({ limit: 20 });
    responseEmployees({ res, employees });
  });
};

// Exercise 2: Add a new employee in the database
const createEmployee = (req, res) => {
  const { name, designation, department } = req.body;
  const salary = parseInt(req.body.salary);
  errorHandler(res, async () => {
    const employee = { name, designation, department, salary };
    await Employee.create(employee);
    responseEmployees({
      res,
      employees: employee,
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: MESSAGES?.CREATE_RESOURCE,
    });
  });
};

// Exercise 3: Update employee information
const updateEmployee = (req, res) => {
  const { name, designation, department } = req.body;
  const salary = parseInt(req.body.salary);
  const id = parseInt(req.params.id);

  errorHandler(res, async () => {
    if (isNaN(id) || !id) {
      throw new HttpError({ message: MESSAGES?.REQUIRED });
    }

    const employee = { name, designation, department, salary };
    await Employee.update(employee, { where: { id: id } });

    responseEmployees({
      res,
      employees: employee,
      message: MESSAGES?.UPDATE_EMPLOYEE,
    });
  });
};

// Exercise 4: Delete an employee from the database
const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(id) || !id) {
      throw new HttpError({ message: MESSAGES?.REQUIRED });
    }

    const employee = await Employee.destroy({ where: { id } });
    if (employee == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: MESSAGES?.NOT_FOUND,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: MESSAGES?.DELETE_EMPLOYEE,
    });
  });
};

// ROUTES
employeeRouter.get("/", getEmployees);
employeeRouter.post("/", createEmployee);
employeeRouter.put("/:id", updateEmployee);
employeeRouter.delete("/:id", deleteEmployee);

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Employee.bulkCreate(employeeData);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
