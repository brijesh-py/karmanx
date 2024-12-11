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
  describe("GET /movies", () => {
    // Exercise 3: Test Retrieve All Movies
    it("should return all movies", async () => {
      const movies = [
        {
          movieId: 1,
          title: "Inception",
          genre: "Sci-Fi",
          director: "Christopher Nolan",
        },
        {
          movieId: 2,
          title: "The Shawshank Redemption",
          genre: "Drama",
          director: "Frank Darabont",
        },
        {
          movieId: 3,
          title: "The Godfather",
          genre: "Crime",
          director: "Francis Ford Coppola",
        },
      ];
      const response = await request(app).get("/movies");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(movies);
    });

    // Exercise 4: Test Retrieve Movie by ID
    it("should return a specific movie by Id", async () => {
      const movie = {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      };

      const response = await request(app).get("/movies/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({movie});
    });
  });
});
