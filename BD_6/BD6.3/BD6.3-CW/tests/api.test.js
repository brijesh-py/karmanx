const {
  app,
  getReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
} = require("../app");
const http = require("http");
const supertest = require("supertest");

jest.mock("../app", () => ({
  ...jest.requireActual("../app"),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
  addReview: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
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

  // Exercise 6: Test get all reviews
  it("Should retrieve all Review", async () => {
    const mockReviews = [
      { id: 1, content: "Great product!", userId: 1 },
      { id: 2, content: "Not bad, could be better.", userId: 2 },
    ];
    getReviews.mockResolvedValue(mockReviews);
    const response = await supertest(server).get("/reviews");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockReviews);
  });

  // Exercise 7: Test get review by ID
  it("Should retrieve a specific Review by ID", async () => {
    const mockReview = {
      id: 2,
      content: "Not bad, could be better.",
      userId: 2,
    };
    getReviewById.mockResolvedValue(2);
    const response = await supertest(server).get("/reviews/details/2");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockReview);
  });

  // Exercise 8: Test get review by non-existent ID
  it("Should retrieve undefined by Non-Existent ID", async () => {
    getReviewById.mockResolvedValue();
    const response = await supertest(server).get("/reviews/details/4");
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: "No Review found" });
  });

  // Exercise 9: Test add new review
  it("Should retrieve a newest added Review", async () => {
    addReview.mockResolvedValue();
    const response = await supertest(server)
      .post("/reviews/new")
      .send({ content: "Awesome!", userId: 2 });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({ id: 3, content: "Awesome!", userId: 2 });
  });

  // Exercise 10: Test get user by ID
  it("Should retrieve a specific User by ID", async () => {
    const mockUser = { id: 2, name: "John Doe", email: "john.doe@duck.com" };
    getUserById.mockResolvedValue();
    const response = await supertest(server).get("/users/details/2");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockUser);
  });

  // Exercise 11: Test get user by non-existent ID
  it("Should expected undefined by Non-Existent ID", async () => {
    getUserById.mockResolvedValue();
    const response = await supertest(server).get("/users/details/3");
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: "No User found" });
  });

  // Exercise 12: Test add new user
  it("Should retrieve newest added User", async () => {
    const mockUser = { name: "Pray", email: "pray.predator@hot.com" };
    addUser.mockResolvedValue();
    const response = await supertest(server).post("/users/new").send(mockUser);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({ id: 3, ...mockUser });
  });
});
