const {
  app,
  getGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
} = require("../app");
const http = require("http");
const supertest = require("supertest");

jest.mock("../app", () => ({
  ...jest.requireActual("../app"),
  getGames: jest.fn(),
  getGameById: jest.fn(),
  addGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addDeveloper: jest.fn(),
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

  // Exercise 6: Test get all games
  it("Should retrieve all Game", async () => {
    const mockGames = [
      {
        id: 1,
        title: "The Legend of Zelda",
        genre: "Adventure",
        developer: "Nintendo",
      },
      {
        id: 2,
        title: "Super Mario Bros",
        genre: "Platformer",
        developer: "Nintendo",
      },
    ];
    getGames.mockResolvedValue();
    const response = await supertest(server).get("/games");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockGames);
  });

  // Exercise 7: Test get game by ID
  it("Should retrieve a specific Game by ID", async () => {
    const mockGame = {
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
      developer: "Nintendo",
    };
    getGameById.mockResolvedValue();
    const response = await supertest(server).get("/games/details/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockGame);
  });

  // Exercise 8: Test get game by non-existent ID
  it("Should expected undefined by non-existent ID", async () => {
    getGameById.mockResolvedValue();
    const response = await supertest(server).get("/games/details/3");
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: "No Game found" });
  });

  // Exercise 9: Test add new game
  it("Should retrieve newest added Game", async () => {
    const mockGame = {
      title: "BGMI",
      genre: "Sci-Fi",
      developer: "Ajay",
    };
    addGame.mockResolvedValue();
    const response = await supertest(server).post("/games/new").send(mockGame);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({ id: 3, ...mockGame });
  });

  // Exercise 10: Test get developer by ID
  it("Should retrieve a specific Developer by ID", async () => {
    const mockDeveloper = { id: 2, name: "Fee Fire", country: "USA" };
    getDeveloperById.mockResolvedValue();
    const response = await supertest(server).get("/developers/details/2");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockDeveloper);
  });

  // Exercise 11: Test get developer by non-existent ID
  it("Should expected undefined by non-existent ID", async () => {
    getDeveloperById.mockResolvedValue();
    const response = await supertest(server).get("/developers/details/3");
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: "No Developer found" });
  });

  // Exercise 12: Test add new developer
  it("Should retrieve newest added Developer", async () => {
    const mockDeveloper = { id: 3, country: "India", name: "Ajay" };
    addDeveloper.mockResolvedValue(mockDeveloper);
    const response = await supertest(server)
      .post("/developers/new")
      .send(mockDeveloper);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({ id: 3, ...mockDeveloper });
  });
});
