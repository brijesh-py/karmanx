const express = require("express");

const app = express();

app.use(express.json());

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Marketing",
  },
];

const getEmployees = () => {
  return employees;
};

const getEmployeeById = (id) => {
  return employees?.find((employee) => employee?.id === id);
};

const addEmployee = (employee) => {
  employee.id = employees?.length + 1;
  employees?.push(employee);
  return employee;
};

app.get("/employees", (req, res) => {
  const employees = getEmployees();
  res.status(200).json(employees);
});

app.get("/employees/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = getEmployeeById(id);
  if (!employee) {
    return res.status(404).json({ message: "No Employee found" });
  }
  res.status(200).json(employee);
});

app.post("/employees/new", (req, res) => {
  const { name, email, department } = req.body;
  const employee = addEmployee({ name, email, department });
  res.status(201).json(employee);
});

module.exports = {
  app,
  getEmployees,
  getEmployeeById,
  addEmployee,
};
