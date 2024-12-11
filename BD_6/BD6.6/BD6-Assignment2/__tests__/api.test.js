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
  describe("GET /stocks", () => {
    // Test 1: Get All Stocks
    it("should return all Stocks", async () => {
      const stocks = [
        {
          stockId: 1,
          ticker: "AAPL",
          companyName: "Apple Inc.",
          price: 150.75,
        },
        {
          stockId: 2,
          ticker: "GOOGL",
          companyName: "Alphabet Inc.",
          price: 2750.1,
        },
        {
          stockId: 3,
          ticker: "TSLA",
          companyName: "Tesla, Inc.",
          price: 695.5,
        },
      ];
      const response = await request(app).get("/stocks");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ stocks });
    });

    //  Test 2: Get Stock by Ticker
    it("should return a specific Stock by Ticker", async () => {
      const stock = {
        stockId: 2,
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2750.1,
      };

      const response = await request(app).get("/stocks/GOOGL");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ stock });
    });

    // Test 3: Add a New Trade
    it("should add a new Trade", async () => {
      const trade = {
        tradeType: "sell",
        tradeDate: "2023-10-01",
        stockId: 2,
        quantity: 10,
      };
      const response = await request(app).post("/trades").send(trade);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ trade: { tradeId: 4, ...trade } });
    });

    // Test 4: Error Handling for Get Stock by Invalid Ticker
    it("should return error for invalid Stock Ticker", async () => {
      const ticker = "Nifty";
      const response = await request(app).get("/stocks/Nifty");
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(
        `Stock with ticker ${ticker} not found`
      );
    });

    // Test 5: Input Validation for Add Trade
    it("should return error for invalid Trade input", async () => {
      const trade = {
        stockId: 2,
        quantity: 12,
        tradeDate: "2023-01-01",
      };
      const response = await request(app).post("/trades").send(trade);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        `tradeType is required and should be a string`
      );
    });
  });
});
