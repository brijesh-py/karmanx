const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getEmployees, getEmployeeById, addEmployee } = require("./employee");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser());

// Controllers
// Exercise 1: Get all Employees
app.get("/employees", (req, res) => {
  const employees = getEmployees();
  res.status(200).json({
    status: 200,
    employees,
  });
});

// Exercise 2: Get Employee by ID
app.get("/employees/:id", (req, res) => {
  const id = req.params.id;
  const employee = getEmployeeById(id);
  res.status(200).json({
    status: 200,
    employee,
  });
});

// Exercise 3: Add new employee
app.post("/employees/", (req, res) => {
  const { name, position } = req.body;
  const employee = addEmployee({ name, position });
  res.status(201).json({
    status: 201,
    employee,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
