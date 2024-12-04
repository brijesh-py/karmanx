const supertest = require("supertest");
const http = require("http");
const app = require("../app");
const {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
  getUserById,
} = require("../db");

jest.mock("../db", () => ({
  ...jest.requireActual("../db"),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
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

  // Exercise 6: Test get all books with no books
  it("Should retrieve all books with no books", async () => {
    getBooks.mockReturnValue([]);
    const response = await supertest(server).get("/books");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No books found");
  });

  // Exercise 7: Test get book by non-existent ID
  it("Should retrieve book by non-existent ID", async () => {
    getBookById.mockReturnValue(null);
    const response = await supertest(server).get("/books/details/999");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No book found");
  });

  // Exercise 8: Test get all reviews with no reviews
  it("Should retrieve all reviews with no reviews", async () => {
    getReviews.mockReturnValue([]);
    const response = await supertest(server).get("/reviews");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No reviews found");
  });

  // Exercise 9: Test get review by non-existent ID
  it("Should retrieve review by non-existent ID", async () => {
    getReviewById.mockReturnValue(null);
    const response = await supertest(server).get("/reviews/details/999");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No review found");
  });

  // Exercise 10: Test get user by non-existent ID
  it("Should retrieve user by non-existent ID", async () => {
    getUserById.mockReturnValue(null);
    const response = await supertest(server).get("/users/details/999");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No user found");
  });
});
