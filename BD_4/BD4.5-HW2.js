const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

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
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// DATABASE CONFIG
let DB;
(async function () {
  try {
    DB = await open({
      filename: "./employees1_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    console.error("Database connections failed: " + error?.message);
    process.exit(1);
  }
})();

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

// CONTROLLERS
// Exercise 1: Fetch Employees by Minimum Salary
const getEmployeesBySalary = (req, res) => {
  const minSalary = req.query?.minSalary || "0";

  errorHandler(res, async () => {
    const query = "SELECT * FROM employees WHERE salary > ? ";
    const employees = await DB?.all(query, [minSalary]);

    if (employees?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Employees found, salary ${minSalary}`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Employees fetched successfully",
      employees,
      hits: employees?.length,
    });
  });
};

// Exercise 2: Fetch Employees by Department and Minimum Experience
const getEmployeesByDepartmentAndExperience = (req, res) => {
  const department = req.query?.department;
  const minExperience = req.query?.minExperience || "0";

  errorHandler(res, async () => {
    if (!department || !minExperience) {
      throw new HttpError({
        message: "department and minExperience query are required",
      });
    }

    const query =
      "SELECT * FROM employees WHERE department = ? AND years_of_experience >= ?";
    const employees = await DB?.all(query, [department, minExperience]);

    if (employees?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: `No Employees found, department ${department} and experience ${minExperience}`,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Employees fetched successfully",
      employees,
      hits: employees?.length,
    });
  });
};

// Exercise 3: Fetch Employees Ordered by Salary
const getEmployeesOrderedBySalary = (req, res) => {
  const lowToHigh = req.query?.lowToHigh == "true";

  errorHandler(res, async () => {
    const query = `SELECT * FROM employees ORDER BY salary ${
      lowToHigh ? "ASC" : "DESC"
    }`;
    const employees = await DB?.all(query, []);

    if (employees?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No Employees found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Employees fetched successfully",
      employees,
      hits: employees?.length,
    });
  });
};
// ROUTES
employeeRouter.get("/salary", getEmployeesBySalary);
employeeRouter.get(
  "/department-experience",
  getEmployeesByDepartmentAndExperience
);
employeeRouter.get("/ordered-by-salary", getEmployeesOrderedBySalary);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
