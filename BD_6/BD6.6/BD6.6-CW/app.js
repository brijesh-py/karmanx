const express = require("express");
const { getAllEmployees, getEmployeeById } = require("./controllers");

const app = express();

app.use(express.json());

// Routes
app.get("/employees", getAllEmployees);
app.get("/employees/:id", getEmployeeById);

module.exports = app;
