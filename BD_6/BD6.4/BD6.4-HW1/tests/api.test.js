const supertest = require("supertest");
const http = require("http");
const app = require("../app");
const {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById,
} = require("../db");

jest.mock("../db", () => ({
  ...jest.requireActual("../db"),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  getDepartments: jest.fn(),
  getDepartmentById: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
}, 10000);

afterAll((done) => {
  server.close(done);
}, 10000);

describe("API Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 6: Test get all employees with no employees
  it("Should retrieve all employees with no employees", async () => {
    getEmployees.mockReturnValue([]);
    const response = await supertest(server).get("/employees");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No employees found");
  });

  // Exercise 7: Test get employee by non-existent ID
  it("Should retrieve employee by non-existent ID", async () => {
    getEmployeeById.mockReturnValue(null);
    const response = await supertest(server).get("/employees/details/23");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No employee found");
  });

  // Exercise 8: Test get all departments with no departments
  it("Should retrieve all departments with no departments", async () => {
    getDepartments.mockReturnValue([]);
    const response = await supertest(server).get("/departments");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No departments found");
  });

  // Exercise 9: Test get department by non-existent ID
  it("Should retrieve department by non-existent ID", async () => {
    getDepartmentById.mockReturnValue(null);
    const response = await supertest(server).get("/departments/details/13");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No department found");
  });
});
