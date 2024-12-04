const employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
  { id: 4, name: "Lisa Brown", position: "DevOps Engineer" },
];

const getEmployees = () => {
  return employees;
};

const getEmployeeById = (id) => {
  const employee = employees?.find((employee) => employee?.id == id);
  return employee;
};

const addEmployee = (employee) => {
  const newEmployee = { id: employees?.length + 1, ...employee };
  employees.push(newEmployee);
  return newEmployee;
};

module.exports = { getEmployeeById, getEmployees, addEmployee };
