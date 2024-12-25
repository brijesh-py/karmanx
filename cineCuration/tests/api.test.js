const MovieController = require("../src/controllers/movie.controller");

describe("Movies Controller test", () => {
  test("GET/ search movie", async () => {
    const req = { query: { query: "avengers" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    const response = await MovieController.searchMovie(req, res);
    console.log(response);
    // expect(response.status).toEqual(500);
  });
});
