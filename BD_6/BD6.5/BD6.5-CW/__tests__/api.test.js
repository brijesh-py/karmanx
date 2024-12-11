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
  // Exercise 4: Test add a new user with valid input
  it("should add a new user with valid input", async () => {
    const user = { name: "Alice", email: "alice@duck.com" };
    const response = await request(server).post("/api/users").send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 1, ...user });
  });

  // Exercise 5: Test add a new user with invalid input
  it("should not add a new user with invalid input", async () => {
    const user = { email: "alice@duck.com" };
    const response = await request(server).post("/api/users").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "name is required and should be a string"
    );
  });

  // Exercise 6: Test add a new book with valid input
  it("should add a new book with valid input", async () => {
    const book = { title: "The Great Gatsby", author: "F. Scott Fitzgerald" };
    const response = await request(server).post("/api/books").send(book);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 1, ...book });
  });

  // Exercise 7: Test add a new book with invalid input
  it("should not add a new book with invalid input", async () => {
    const book = { author: "F. Scott Fitzgerald" };
    const response = await request(server).post("/api/books").send(book);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "title is required and should be a string"
    );
  });

  // Exercise 8: Test add a new review with valid input
  it("should add a new review with valid input", async () => {
    const review = { content: "Great book!", userId: 1 };
    const response = await request(server).post("/api/reviews").send(review);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 1, ...review });
  });

  // Exercise 9: Test add a new review with invalid input
  it("should not add a new review with invalid input", async () => {
    const review = { content: "Great book!" };
    const response = await request(server).post("/api/reviews").send(review);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "userId is required and should be a number"
    );
  });
});
