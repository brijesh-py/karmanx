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
  // Exercise 3: Test Add a New Article with Valid Input
  it("Should add a new Article with valid input", async () => {
    const article = {
      title: "The Great Gatsby",
      content: "A classic novel by F. Scott Fitzgerald",
    };
    const response = await request(server).post("/api/articles").send(article);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 3, ...article });
  });

  // Exercise 4: Test Add a New Article with Invalid Input
  it("Should not add a new Article with invalid input", async () => {
    const article = {
      content: "A classic novel by F. Scott Fitzgerald",
    };
    const response = await request(server).post("/api/articles").send(article);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "title is required and should be a string"
    );
  });

  // Exercise 5: Test Add a New Author with Valid Input
  it("Should add a new Author with valid input", async () => {
    const author = {
      name: "John Doe",
      articleId: 1,
    };
    const response = await request(server).post("/api/authors").send(author);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 3, ...author });
  });

  // Exercise 6: Test Add a New Author with Invalid Input
  it("Should not add a new Author with invalid input", async () => {
    const author = {
      name: "John Doe",
    };
    const response = await request(server).post("/api/authors").send(author);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "articleId is required and should be a number"
    );
  });
});
