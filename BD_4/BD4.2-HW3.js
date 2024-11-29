const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Initializing Server
const app = express();
const PORT = process.env.PORT || 5000;

// Company Router
const companyRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/companies", companyRouter);

// Constants
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Error Handler
class HttpError extends Error {
  constructor({ status, message, error }) {
    super(message);
    this.status = status || HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR;
    this.error = error;
  }
}

const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.status).json({
        status: error?.status,
        message: error?.message || "Some went wrong!",
        error: error?.error,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "Internal server error",
        error: error?.error,
      });
    }
  }
};

// Database config
let db;
(async function () {
  try {
    db = await open({
      filename: "./company_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    process.exit(1);
  }
})();

// Controllers
// Exercise 1: Fetch All Companies
function getCompanies(req, res) {
  errorHandler(res, async function () {
    const query = "SELECT * FROM companies";
    const companies = await db?.all(query, []);

    if (companies.length == 0 || !companies) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No Company found",
        error: {
          code: "NOT_FOUND",
          details: "The requested companies not found",
        },
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Companies fetched successfully",
      companies,
    });
  });
}

function getCompaniesByProps(prop) {
  return function (req, res) {
    const key = req.params[prop];
    errorHandler(res, async function () {
      const query = `SELECT * FROM companies WHERE ${prop} = ?`;
      const companies = await db?.all(query, [key]);

      if (companies.length == 0 || !companies) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES?.NOT_FOUND,
          message: "No Company found",
          error: {
            code: "NOT_FOUND",
            details: "The requested companies not found",
          },
        });
      }
      res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTPS_STATUS_CODES?.RESPONSE_OK,
        message: "Companies fetched successfully",
        companies,
      });
    });
  };
}

function getCompaniesByRevenue(req, res) {
  const minRevenue = parseInt(req.query?.minRevenue);
  const maxRevenue = parseInt(req.query?.maxRevenue);
  errorHandler(res, async () => {
    if (isNaN(minRevenue) || isNaN(maxRevenue)) {
      throw new HttpError({
        message: "minRevenue and maxRevenue query are expected as a number",
        error: {
          code: "BAD_REQUEST_ERROR",
        },
      });
    }

    const query = `SELECT * FROM companies WHERE revenue BETWEEN ? AND ?`;
    const companies = await db?.all(query, [minRevenue, maxRevenue]);

    if (companies.length == 0 || !companies) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No Company found",
        error: {
          code: "NOT_FOUND",
          details: "The requested companies not found",
        },
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Companies fetched successfully",
      companies,
    });
  });
}

// Routes
companyRouter.get("/", getCompanies);
companyRouter.get("/industry/:industry", getCompaniesByProps("industry"));
companyRouter.get("/revenue", getCompaniesByRevenue);
companyRouter.get(
  "/employees/:employee_count",
  getCompaniesByProps("employee_count")
);
companyRouter.get(
  "/founded_year/:founded_year",
  getCompaniesByProps("founded_year")
);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
