const express = require("express");

const app = express();

const employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
];

const getEmployees = () => {
  return employees;
};

const getEmployeeById = (id) => {
  return employees?.find((employee) => employee?.id === id);
};

const addEmployee = (employee) => {
  employees?.push(employee);
  return employee;
};

app.get("/employees", (req, res) => {
  res.json(getEmployees());
});

app.get("/employees/details/:id", (req, res) => {
  const id = req.params.id;
  const employee = getEmployeeById(id);
  if (!employee) {
    return res.status(404).json({ message: "No Employee found." });
  }
  res.json(employee);
});

app.post("/employees", (req, res) => {
  const { name, position } = req.body;
  const id = req.body?.id;
  const employee = addEmployee({ id, name, position });
  req.status(201).json(employee);
});

module.exports = { app, getEmployees, getEmployeeById, addEmployee };
