const employees = [
  {
    employeeId: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    departmentId: 1,
    roleId: 1,
  },
  {
    employeeId: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    departmentId: 2,
    roleId: 2,
  },
];

// Exercise 1: Retrieve All Employees
const getAllEmployees = (req, res) => {
  res.json(employees);
};

// Exercise 2: Retrieve Employee by ID
const getEmployeeById = (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.employeeId === employeeId);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: "Employee not found" });
  }
};

module.exports = { getAllEmployees, getEmployeeById };
