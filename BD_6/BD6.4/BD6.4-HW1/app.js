const express = require("express");
const {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById,
} = require("./db");

const app = express();
app.use(express.json());

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

// Exercise 1: Get All Employees
app.get("/employees", (req, res) => {
  errorHandler(res, async () => {
    const employees = await getEmployees();
    if (employees?.length == 0 || !employees) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No employees found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(employees);
  });
});

// Exercise 2: Get Employee by ID
app.get("/employees/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const employee = await getEmployeeById(id);
    if (!employee) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No employee found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(employee);
  });
});

// Exercise 3: Get All Departments
app.get("/departments", (req, res) => {
  errorHandler(res, async () => {
    const departments = await getDepartments();
    if (departments?.length == 0 || !departments) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No departments found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(departments);
  });
});

// Exercise 4: Get Departments by ID
app.get("/departments/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const department = await getDepartmentById(id);
    if (!department) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No department found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(department);
  });
});

module.exports = app;
