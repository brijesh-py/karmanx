const request = require("supertest");
const http = require("http");
const app = require("../app");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Tests", () => {
  describe("GET /games", () => {
    // Exercise 3: Test Retrieve All Games
    it("should return all games", async () => {
      const games = [
        {
          gameId: 1,
          title: "The Legend of Zelda: Breath of the Wild",
          genre: "Adventure",
          platform: "Nintendo Switch",
        },
        {
          gameId: 2,
          title: "Red Dead Redemption 2",
          genre: "Action",
          platform: "PlayStation 4",
        },
        {
          gameId: 3,
          title: "The Witcher 3: Wild Hunt",
          genre: "RPG",
          platform: "PC",
        },
      ];
      const response = await request(app).get("/games");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({games});
    });

    // Exercise 4: Test Retrieve Game by ID
    it("should return a specific game by Id", async () => {
      const game = {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      };

      const response = await request(app).get("/games/3");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ game });
    });
  });
});
