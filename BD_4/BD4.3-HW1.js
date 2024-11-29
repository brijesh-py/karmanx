const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");
const dotenv = require("dotenv");

// config .env
dotenv.config();

// initializing server
const app = express();
const PORT = process.env.PORT || 5000;

// Employee Router
const employeeRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/employees", employeeRouter);

// http status code
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// database config
let DB;
(async function () {
  try {
    DB = await open({
      filename: "./employees_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    console.error("Database connection failed", error?.message);
    process.exit(1);
  }
})();

// error handler
class HttpError extends Error {
  constructor({
    status = HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR,
    message = "An error occurred",
    error = null,
  }) {
    super(message);
    this.status = status;
    this.error = error;
  }
}

async function errorHandler(res, func) {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
        error: error.error,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR || 500).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR || 500,
        message: error?.message || "An unexpected error occurred",
        error: error?.stack || null,
      });
    }
  }
}

// controllers
// Exercise 1,2,3 and 4: Fetch All Employees by Props
function getEmployeesByProps(prop) {
  return function (req, res) {
    const key = req.params[prop];
    errorHandler(res, async function () {
      const query = `SELECT * FROM employees WHERE ${prop} = ?`;
      const employees = await DB?.all(query, [key]);

      if (!employees) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        });
      }

      if (employees?.length == 0) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No Employees found",
          error: {
            code: "NOT_FOUND",
            details: "The requested employees not found",
          },
        });
      }

      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        message: "Employees fetched successfully",
        employees,
      });
    });
  };
}

// routes
employeeRouter.get("/gender/:gender", getEmployeesByProps("gender"));
employeeRouter.get(
  "/department/:department",
  getEmployeesByProps("department")
);
employeeRouter.get("/job_title/:job_title", getEmployeesByProps("job_title"));
employeeRouter.get("/location/:location", getEmployeesByProps("location"));

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
