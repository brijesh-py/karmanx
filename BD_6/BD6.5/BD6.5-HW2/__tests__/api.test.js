const request = require("supertest");
const app = require("../app");
const http = require("http");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Tests", () => {
  // Exercise 3: Test Add a New Employee with Valid Input
  it("Should add a new Employee with valid input", async () => {
    const employee = { name: "John Doe", companyId: 1 };
    const response = await request(server)
      .post("/api/employees")
      .send(employee);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 1, ...employee });
  });

  // Exercise 4: Test Add a New Employee with Invalid Input
  it("Should not add a new Employee with invalid input", async () => {
    const employee = { name: "John Doe", companyId: "1" };
    const response = await request(server)
      .post("/api/employees")
      .send(employee);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "companyId is required and should be a number"
    );
  });

  // Exercise 5: Test Add a New Company with Valid Input
  it("Should add a new Company with valid input", async () => {
    const company = {
      name: "ABC Company",
    };
    const response = await request(server).post("/api/companies").send(company);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 1, ...company });
  });

  // Exercise 6: Test Add a New Company with Invalid Input
  it("Should not add a new Company with invalid input", async () => {
    const company = {};
    const response = await request(server).post("/api/companies").send(company);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "name is required and should be a string"
    );
  });
});
