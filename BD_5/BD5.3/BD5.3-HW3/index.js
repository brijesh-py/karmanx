const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib");
const Company = require("./models/company.model");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// COMPANY ROUTER
const companyRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use("/companies", companyRouter);

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
  FETCH_RESOURCE: "Companies retrieved successfully.",
  CREATE_RESOURCE: "Company created successfully.",
  UPDATE_RESOURCE: "Company updated successfully.",
  DELETE_RESOURCE: "Company deleted successfully.",
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
const responseCompanies = ({
  res,
  companies,
  status = HTTPS_STATUS_CODES?.RESPONSE_OK,
  message = MESSAGES?.FETCH_RESOURCE,
}) => {
  if (companies?.length == 0 || !companies) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: MESSAGES?.NOT_FOUND,
    });
  }
  res.status(status).json({
    message,
    status,
    companies,
  });
};

// Dummy Data
const companiesData = [
  {
    id: 1,
    name: "Tech Innovators",
    industry: "Technology",
    foundedYear: 2010,
    headquarters: "San Francisco",
    revenue: 75000000,
  },
  {
    id: 2,
    name: "Green Earth",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Portland",
    revenue: 50000000,
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
    id: 4,
    name: "Solar Solutions",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Austin",
    revenue: 60000000,
  },
  {
    id: 5,
    name: "HealthFirst",
    industry: "Healthcare",
    foundedYear: 2008,
    headquarters: "New York",
    revenue: 80000000,
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
    id: 9,
    name: "LifeWell",
    industry: "Healthcare",
    foundedYear: 2010,
    headquarters: "Houston",
    revenue: 75000000,
  },
  {
    id: 10,
    name: "CleanTech",
    industry: "Renewable Energy",
    foundedYear: 2008,
    headquarters: "Denver",
    revenue: 62000000,
  },
];

// CONTROLLERS
// Exercise 1: Fetch all companies
const getCompanies = (req, res) => {
  errorHandler(res, async () => {
    const companies = await Company.findAll({ limit: 20 });
    responseCompanies({ res, companies });
  });
};

// Exercise 2: Add a new company in the database
const createCompany = (req, res) => {
  const { name, industry, headquarters } = req.body;
  const foundedYear = parseInt(req.body.foundedYear);
  const revenue = parseInt(req.body.revenue);
  errorHandler(res, async () => {
    const company = { name, industry, headquarters, foundedYear, revenue };
    await Company.create(company);
    responseCompanies({
      res,
      companies: company,
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: MESSAGES?.CREATE_RESOURCE,
    });
  });
};

// Exercise 3: Update companies information
const updateCompany = (req, res) => {
  const { name, industry, headquarters } = req.body;
  const foundedYear = parseInt(req.body.foundedYear) || undefined;
  const revenue = parseInt(req.body.revenue) || undefined;
  const id = parseInt(req.params.id);

  errorHandler(res, async () => {
    if (isNaN(id) || !id) {
      throw new HttpError({ message: MESSAGES?.REQUIRED });
    }

    const company = { name, industry, headquarters, foundedYear, revenue };
    await Company.update(company, { where: { id: id } });

    responseCompanies({
      res,
      companies: company,
      message: MESSAGES?.UPDATE_RESOURCE,
    });
  });
};

// Exercise 4: Delete an company from the database
const deleteCompany = (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(id) || !id) {
      throw new HttpError({ message: MESSAGES?.REQUIRED });
    }

    const company = await Company.destroy({ where: { id } });
    if (company == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: MESSAGES?.NOT_FOUND,
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: MESSAGES?.DELETE_RESOURCE,
    });
  });
};

// ROUTES
companyRouter.get("/", getCompanies);
companyRouter.post("/", createCompany);
companyRouter.put("/:id", updateCompany);
companyRouter.delete("/:id", deleteCompany);

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
