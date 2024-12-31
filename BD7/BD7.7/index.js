require("dotenv").config();
const connectDB = require("./db/db.connect");
const Author = require("./models/author.model");
const Book = require("./models/book.model");
const Department = require("./models/department.model");
const Employee = require("./models/employee.model");

connectDB();

async function addDepartment() {
  try {
    const department = await Department.create({
      name: "Marketing",
      location: "Bangalore",
    });
    console.log("Department added", department);
  } catch (error) {
    console.log("Error adding department", error);
  }
}
// addDepartment();

async function addEmployee() {
  try {
    const employee = await Employee.create({
      name: "Shaurabh",
      email: "shaurabh@example.com",
      department: "676fcc1c2a07c216c1adf8c0",
    });
    console.log("Employee added", employee);
  } catch (error) {
    console.log("Error adding employee", error);
  }
}
// addEmployee();

async function getEmployees() {
  try {
    const employees = await Employee.find().populate("department");
    console.log(employees);
  } catch (error) {
    console.log("Error getting employees", error);
  }
}
getEmployees();
