const { createUser } = require("../src/controllers/user.controller");
const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../config/db");

jest.mock("../src/controllers/user.controller");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("createUser", () => {
  it("should create a user", async () => {
    createUser.mockResolvedValue({
      id: 1,
      username: "test",
      email: "1hDy9@example.com",
    });
    const response = await request(app).post("/api/register").send({
      username: "test",
      email: "1hDy9@example.com",
    });
    expect(response.status).toBe(200);
  }, 20000);
});
