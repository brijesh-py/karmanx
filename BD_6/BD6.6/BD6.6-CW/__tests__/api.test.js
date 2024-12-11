const request = require("supertest");
const http = require("http");
const app = require("../app");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Tests", () => {
  describe("GET /employees", () => {
    // Exercise 3: Test Retrieve All Employees
    it("should return all employees", async () => {
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
      const response = await request(app).get("/employees");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(employees);
    });

    // Exercise 4: Test Retrieve Employee by ID
    it("should return a specific employee by Id", async () => {
      const employee = {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      };
      const response = await request(app).get("/employees/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(employee);
    });
  });
});
