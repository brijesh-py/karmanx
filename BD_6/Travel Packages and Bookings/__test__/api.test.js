const request = require("supertest");
const http = require("http");
const app = require("../app");
const { travelPackages } = require("../data");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Tests", () => {
  // Test 1: Retrieve All Packages
  it("should return all Travel Packages", async () => {
    const response = await request(app).get("/packages");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ packages: travelPackages });
  });

  // Test 2: Retrieve Package by Destination
  it("should return package by destination", async () => {
    const packages = [
      {
        packageId: 1,
        destination: "Paris",
        price: 1500,
        duration: 7,
        availableSlots: 10,
      },
    ];
    const response = await request(app).get("/packages/Paris");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ packages });
  });

  // Test 3: Add a New Booking
  it("should return New Booking", async () => {
    const newBooking = {
      packageId: 4,
      customerName: "Raj Kulkarni",
      bookingDate: "2024-12-20",
      seats: 2,
    };
    const response = await request(app).post("/bookings").send(newBooking);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      booking: {
        bookingId: 6,
        packageId: 4,
        customerName: "Raj Kulkarni",
        bookingDate: "2024-12-20",
        seats: 2,
      },
    });
  });

  // Test 4: Update Available Slots
  it("should return Updated available slot", async () => {
    const response = await request(app).get("/packages/seats-update");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      package: {
        packageId: 1,
        destination: "Paris",
        price: 1500,
        duration: 7,
        availableSlots: 8,
      },
    });
  });

  // Test 5: Retrieve Bookings for a Package
  it("should return Bookings based on package Id", async () => {
    const bookings = {
      bookings: [
        {
          bookingId: 1,
          packageId: 1,
          customerName: "Anjali Seth",
          bookingDate: "2024-12-01",
          seats: 2,
        },
      ],
    };
    const response = await request(app).get("/packages/seats-update");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(bookings);
  });
});
