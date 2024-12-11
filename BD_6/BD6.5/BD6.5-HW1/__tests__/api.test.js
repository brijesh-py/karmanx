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
  // Exercise 3: Test Add a New Game with Valid Input
  it("Should add a new Game with valid input", async () => {
    const game = { title: "Free Fire", genre: "Sci-Fi" };
    const response = await request(server).post("/api/games").send(game);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 1, ...game });
  });

  // Exercise 4: Test Add a New Game with Invalid Input
  it("Should not add a new Game with invalid input", async () => {
    const game = { title: "Free Fire", name: "Sci-Fi" };
    const response = await request(server).post("/api/games").send(game);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "genre is required and should be a string"
    );
  });

  // Exercise 5: Test Add a New Tournament with Valid Input
  it("Should add a new Tournament with valid input", async () => {
    const tournament = {
      name: "Zelda Championship",
      gameId: 1,
    };
    const response = await request(server)
      .post("/api/tournaments")
      .send(tournament);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 1, ...tournament });
  });

  // Exercise 6: Test Add a New Tournament with Invalid Input
  it("Should not add a new Tournament with invalid input", async () => {
    const tournament = { name: "Zelda Championship", gameId: "1" };
    const response = await request(server)
      .post("/api/tournaments")
      .send(tournament);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "gameId is required and should be a number"
    );
  });
});
