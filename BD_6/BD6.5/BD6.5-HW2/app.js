const express = require("express");
const { addEmployee, addCompany } = require("./controllers");

const app = express();

app.use(express.json());

// Validate Input Middleware
const validateInput = (queries) => {
  return (req, res, next) => {
    let invalidQuery;
    for (const query in queries) {
      const arr = queries[query];
      const key = req.body[arr[0]];
      if (!key || typeof key !== arr[1] || key?.length < arr[2]) {
        invalidQuery = arr;
      }
    }
    if (invalidQuery) {
      const lengthMessage = invalidQuery[2]
        ? ` with a length of at least ${invalidQuery[2]}`
        : "";
      res.status(400).json({
        status: 400,
        message: `${invalidQuery[0]} is required and should be a ${invalidQuery[1]}${lengthMessage}`,
      });
    }
    next();
  };
};

// Routes
app.post(
  "/api/employees/",
  validateInput([
    ["name", "string"],
    ["companyId", "number"],
  ]),
  addEmployee
);
app.post("/api/companies/", validateInput([["name", "string"]]), addCompany);

module.exports = app;
