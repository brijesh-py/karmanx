const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  Employee,
  Department,
  Role,
  EmployeeRole,
  EmployeeDepartment,
} = require("./models");
const { HttpError, errorHandler } = require("./utils/error-handler");
const response = require("./utils/response");
const { HTTPS_STATUS_CODES } = require("./constants");
const { sequelize } = require("./lib");
const { Sequelize } = require("sequelize");

// Server Initializing
const app = express();
const PORT = 3000;

// Router
const employeeRouter = express.Router();

// Middlewares
app.use(cors());
app.use(bodyParser());
app.use("/employees", employeeRouter);

// Check ID
const checkIds = async (Model, id, key) => {
  const isExist = await Model.findOne({ where: { id } });
  if (!isExist) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES.NOT_FOUND,
      message: `${key} ID is not found`,
    });
  }
  return isExist;
};

// Validate Employee
const validateEmployee = (req, res, next) => {
  const { name, email } = req.body;
  const departmentId = parseInt(req.body?.departmentId);
  const roleId = parseInt(req.body?.roleId);
  errorHandler(res, async () => {
    if (!name || !email || isNaN(departmentId) || isNaN(roleId)) {
      throw new HttpError({ message: "Employee fields are required" });
    }
    await checkIds(Department, departmentId, "Department");
    await checkIds(Role, roleId, "Role");
    next();
  });
};

// Controllers
// Exercise 1: Get All Employees
const getEmployees = (req, res) => {
  errorHandler(res, async () => {
    let employees = await Employee.findAll({
      limit: 20,
    });
    if (employees?.length == 0 || !employees) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES.NOT_FOUND,
        message: "No Employees found",
      });
    }

    response({ res, status: HTTPS_STATUS_CODES.OK, employees });
  });
};

// Exercise 2, 3 and 4: Get Employees by (PROP ID)
const getEmployeeByPropId = (key) => {
  return (req, res) => {
    const value = req.params[key];
    errorHandler(res, async () => {
      const employee = await Employee.findOne({ where: { [key]: value } });
      if (!employee) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES.NOT_FOUND,
          message: "No Employee found.",
        });
      }
      response({ res, status: HTTPS_STATUS_CODES.OK, employee });
    });
  };
};

// Exercise 5: Get Employees Sorted by (PROP)
const getEmployeesSortedByProp = (key) => {
  return (req, res) => {
    const order = req.req?.order == "desc" ? "desc" : "asc";
    errorHandler(res, async () => {
      const employees = await Employee.findAll({
        order: [[key, order]],
      });
      if (employees?.length == 0 || !employees) {
        throw new HttpError({
          status: HTTPS_STATUS_CODES.NOT_FOUND,
          message: "No Employees found.",
        });
      }
      response({ res, status: HTTPS_STATUS_CODES.OK, employees });
    });
  };
};

// Exercise 5: Add a New Employee
const createEmployee = (req, res) => {
  const { name, email } = req.body;
  const departmentId = parseInt(req.body?.departmentId);
  const roleId = parseInt(req.body?.roleId);
  errorHandler(res, async () => {
    const employee = { name, email, departmentId, roleId };
    const createdEmployee = await Employee.create(employee);

    response({
      res,
      status: HTTPS_STATUS_CODES.CREATE,
      message: "Employee created successfully",
      employee: createdEmployee,
    });
  });
};

// Exercise 6: Update Employee Details
const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const departmentId = parseInt(req.body?.departmentId);
  const roleId = parseInt(req.body?.roleId);
  errorHandler(res, async () => {
    const employee = { name, email, departmentId, roleId };
    const isUpdated = await Employee.update(employee, { where: { id } });
    if (isUpdated == 0) {
      throw new HttpError({ message: "Employee not updated." });
    }

    response({
      res,
      status: HTTPS_STATUS_CODES.OK,
      message: "Employee updated successfully",
      employee,
    });
  });
};

// Exercise 7: Delete a Employee
const deleteEmployee = (req, res) => {
  const id = req.params.id;
  errorHandler(res, async () => {
    if (isNaN(id)) {
      throw new HttpError({ message: "Employee ID expected as a number." });
    }
    const isDeleted = await Employee.destroy({ where: { id } });
    if (!isDeleted) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES.NOT_FOUND,
        message: "No Employee found.",
      });
    }
    const message = `Employee with ID ${id} deleted successfully.`;
    response({
      res,
      status: HTTPS_STATUS_CODES.OK,
      message,
    });
  });
};

// Routes
employeeRouter.get("/", getEmployees);
employeeRouter.get("/details/:id", getEmployeeByPropId("id"));
employeeRouter.get(
  "/department/:departmentId",
  getEmployeeByPropId("departmentId")
);
employeeRouter.get("/role/:roleId", getEmployeeByPropId("roleId"));
employeeRouter.get("/sort-by-name", getEmployeesSortedByProp("name"));
employeeRouter.post("/new", validateEmployee, createEmployee);
employeeRouter.put("/update/:id", validateEmployee, updateEmployee);
employeeRouter.delete("/delete/:id", deleteEmployee);

// Endpoint to seed database
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  const departments = await Department.bulkCreate([
    { name: "Engineering" },
    { name: "Marketing" },
  ]);

  const roles = await Role.bulkCreate([
    { title: "Software Engineer" },
    { title: "Marketing Specialist" },
    { title: "Product Manager" },
  ]);

  const employees = await Employee.bulkCreate([
    {
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      roleId: 1,
      departmentId: 2,
    },
    {
      name: "Priya Singh",
      email: "priya.singh@example.com",
      roleId: 2,
      departmentId: 1,
    },
    {
      name: "Ankit Verma",
      email: "ankit.verma@example.com",
      roleId: 1,
      departmentId: 1,
    },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await EmployeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await EmployeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await EmployeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await EmployeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await EmployeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await EmployeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  return res.json({ message: "Database seeded!" });
});

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
