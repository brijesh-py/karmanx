const employees = [];
const companies = [];

// Exercise 1: Add a New Employee
const addEmployee = (req, res) => {
  const { name, companyId } = req.body;
  const employee = { name, companyId };
  employee.id = employees?.length + 1;
  employees?.push(employee);
  res.status(201).json(employee);
};

// Exercise 2: Add a New Company
const addCompany = (req, res) => {
  const { name } = req.body;
  const company = { name };
  company.id = companies?.length + 1;
  companies?.push(company);
  res.status(201).json(company);
};

module.exports = { addEmployee, addCompany };
