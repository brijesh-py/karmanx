const { app, getEmployees, getEmployeeById, addEmployee } = require("../app");
const http = require("http");
const supertest = require("supertest");

jest.mock("../app", () => ({
  ...jest.requireActual("../app"),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
}, 10000);

afterAll((done) => {
  server.close(done);
}, 10000);

describe("Functions Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 4: Test get all employees
  it("Should retrieve all Employees", async () => {
    const mockEmployees = [
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
    getEmployees.mockResolvedValue();
    const response = await supertest(server).get("/employees");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockEmployees);
  });

  // Exercise 5: Test get employee by ID
  it("Should retrieve a specific Employee by ID", async () => {
    const mockEmployee = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
    };
    getEmployeeById.mockResolvedValue();
    const response = await supertest(server).get("/employees/details/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockEmployee);
  });

  // Exercise 6: Test get employee by non-existent ID
  it("Should expected undefined by non-existent ID", async () => {
    getEmployeeById.mockResolvedValue();
    const response = await supertest(server).get("/employees/details/3");
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: "No Employee found" });
  });

  // Exercise 7: Test add new employee
  it("Should retrieve newest added Employee", async () => {
    const mockEmployee = {
      name: "Sam Ahmed",
      email: "sam.ahmed@hot.com",
      department: "HR",
    };
    addEmployee.mockResolvedValue();
    const response = await supertest(server)
      .post("/employees/new")
      .send(mockEmployee);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({ id: 3, ...mockEmployee });
  });
});
