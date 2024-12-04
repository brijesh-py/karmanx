const supertest = require("supertest");
const http = require("http");
const app = require("../app");
const {
  getArticles,
  getArticleById,
  getComments,
  getCommentById,
  getUserById,
} = require("../db");

jest.mock("../db", () => ({
  ...jest.requireActual("../db"),
  getArticles: jest.fn(),
  getArticleById: jest.fn(),
  getComments: jest.fn(),
  getCommentById: jest.fn(),
  getUserById: jest.fn(),
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

  // Exercise 6: Test Get All Articles with No Articles
  it("Should retrieve all articles with no articles", async () => {
    getArticles.mockReturnValue([]);
    const response = await supertest(server).get("/articles");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No articles found");
  });

  // Exercise 7: Test Get Article by Non-Existent ID
  it("Should retrieve article by non-existent ID", async () => {
    getArticleById.mockReturnValue(null);
    const response = await supertest(server).get("/articles/details/99");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No article found");
  });

  // Exercise 8: Test Get All Comments with No Comments
  it("Should retrieve all comments with no comments", async () => {
    getComments.mockReturnValue([]);
    const response = await supertest(server).get("/comments");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No comments found");
  });

  // Exercise 9: Test Get Comment by Non-Existent ID
  it("Should retrieve comment by non-existent ID", async () => {
    getCommentById.mockReturnValue(null);
    const response = await supertest(server).get("/comments/details/7");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No comment found");
  });

  // Exercise 10: Test Get User by Non-Existent ID
  it("Should retrieve user by non-existent ID", async () => {
    getUserById.mockReturnValue(null);
    const response = await supertest(server).get("/users/details/56");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No user found");
  });
});
