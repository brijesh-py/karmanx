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
  describe("GET /shows", () => {
    // Test 1: Get All Shows
    it("should return all shows", async () => {
      const shows = [
        { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
        { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
        { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
        { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
      ];
      const response = await request(app).get("/shows");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ shows });
    });

    // Test 2: Get Show by ID
    it("should return a specific show by Id", async () => {
      const show = {
        showId: 4,
        title: "Les Misérables",
        theatreId: 1,
        time: "6:00 PM",
      };

      const response = await request(app).get("/shows/4");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ show });
    });

    // Test 3: Add a New Show
    it("should add a new show", async () => {
      const show = {
        title: "The Lion King",
        theatreId: 1,
        time: "7:00 PM",
      };
      const response = await request(app).post("/shows").send(show);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ show: { showId: 5, ...show } });
    });

    // Test 4: Error Handling for Get Show by Invalid ID
    it("should return error for invalid show Id", async () => {
      const showId = 0;
      const response = await request(app).get("/shows/0");
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(`Show with id ${showId} not found`);
    });

    // Test 5: Input Validation for Add Show
    it("should return error for invalid show input", async () => {
      const show = {
        title: "The Lion King",
        theatreId: "23",
        time: "7:00 PM",
      };
      const response = await request(app).post("/shows").send(show);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        `theatreId is required and should be a number`
      );
    });
  });
});
