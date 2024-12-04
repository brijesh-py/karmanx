const supertest = require("supertest");
const http = require("http");
const app = require("../app");
const { getGames, getGameById, getGenres, getGenreById } = require("../db");

jest.mock("../db", () => ({
  ...jest.requireActual("../db"),
  getGames: jest.fn(),
  getGameById: jest.fn(),
  getGenres: jest.fn(),
  getGenreById: jest.fn(),
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

  // Exercise 5: Test get all games with no games
  it("Should retrieve all games with no games", async () => {
    getGames.mockReturnValue([]);
    const response = await supertest(server).get("/api/games");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No games found");
  });

  // Exercise 6: Test get game by non-existent ID
  it("Should retrieve game by non-existent ID", async () => {
    getGameById.mockReturnValue(null);
    const response = await supertest(server).get("/api/games/details/9");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No game found");
  });

  // Exercise 7: Test get all genres with no genres
  it("Should retrieve all genres with no genres", async () => {
    getGenres.mockReturnValue([]);
    const response = await supertest(server).get("/api/genres");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No genres found");
  });

  // Exercise 8: Test get genre by non-existent ID
  it("Should retrieve genre by non-existent ID", async () => {
    getGenreById.mockReturnValue(null);
    const response = await supertest(server).get("/api/genres/details/7");
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual("No genre found");
  });
});
