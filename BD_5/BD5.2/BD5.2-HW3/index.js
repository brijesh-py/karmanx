const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./lib");
const Company = require("./models/company.model");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// COMPANY ROUTER
const companyRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/companies", companyRouter);

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
const responseCompanies = (res, companies) => {
  if (companies?.length == 0 || !companies) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: "No companies found",
    });
  }
  res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
    status: HTTPS_STATUS_CODES?.RESPONSE_OK,
    companies,
  });
};

// Dummy Data
const companiesData = [
  {
    id: 2,
    name: "Green Earth",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Portland",
    revenue: 50000000,
  },
  {
    id: 6,
    name: "EcoPower",
    industry: "Renewable Energy",
    foundedYear: 2018,
    headquarters: "Seattle",
    revenue: 55000000,
  },
  {
    id: 4,
    name: "Solar Solutions",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Austin",
    revenue: 60000000,
  },
  {
    id: 10,
    name: "CleanTech",
    industry: "Renewable Energy",
    foundedYear: 2008,
    headquarters: "Denver",
    revenue: 62000000,
  },
  {
    id: 3,
    name: "Innovatech",
    industry: "Technology",
    foundedYear: 2012,
    headquarters: "Los Angeles",
    revenue: 65000000,
  },
  {
    id: 7,
    name: "MediCare",
    industry: "Healthcare",
    foundedYear: 2012,
    headquarters: "Boston",
    revenue: 70000000,
  },
  {
    id: 8,
    name: "NextGen Tech",
    industry: "Technology",
    foundedYear: 2018,
    headquarters: "Chicago",
    revenue: 72000000,
  },
  {
    id: 1,
    name: "Tech Innovators",
    industry: "Technology",
    foundedYear: 2010,
    headquarters: "San Francisco",
    revenue: 75000000,
  },
  {
    id: 9,
    name: "LifeWell",
    industry: "Healthcare",
    foundedYear: 2010,
    headquarters: "Houston",
    revenue: 75000000,
  },
  {
    id: 5,
    name: "HealthFirst",
    industry: "Healthcare",
    foundedYear: 2008,
    headquarters: "New York",
    revenue: 80000000,
  },
];

// CONTROLLERS
// Exercise 1: Fetch all companies
const getCompanies = (req, res) => {
  errorHandler(res, async () => {
    const companies = await Company.findAll();
    responseCompanies(res, companies);
  });
};

// Exercise 2: Fetch companies details by ID
const getCompanyById = (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const company = await Company.findAll({ where: { id } });
    responseCompanies(res, ...company);
  });
};

// Exercise 3: Fetch all companies by (PROP)
const getCompaniesByProps = (key) => {
  return (req, res) => {
    const reKey = key?.replace("-", "_");
    const value = req.params[key];
    errorHandler(res, async () => {
      const companies = await Company.findAll({
        where: { [reKey]: value },
      });
      responseCompanies(res, companies);
    });
  };
};

// Exercise 4: Sort all the companies by (PROP)
const getSortedCompaniesByProps = (key) => {
  return (req, res) => {
    const reKey = key?.replace("-", "_");
    const order = req.query?.order == "asc" ? "asc" : "desc";
    errorHandler(res, async () => {
      const companies = await Company.findAll({
        order: [[reKey, order]],
      });
      responseCompanies(res, companies);
    });
  };
};

// ROUTES
companyRouter.get("/", getCompanies);
companyRouter.get("/details/:id", getCompanyById);
companyRouter.get("/industry/:industry", getCompaniesByProps("industry"));
companyRouter.get("/revenue", getSortedCompaniesByProps("revenue"));

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Company.bulkCreate(companiesData);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
