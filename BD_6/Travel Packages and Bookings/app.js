const express = require("express");
const { travelPackages, bookings } = require("./data");

const app = express();

app.use(express.json());

// Default endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Travel Packages and Bookings System!");
});

// Exercise 1: Retrieve All Travel Packages (GET)
const getTravelPackages = (req, res) => {
  res.status(200).json({ packages: travelPackages });
};

// Exercise 2: Retrieve Travel Package by Destination (GET)
const getTravelPackagesByDestination = (req, res) => {
  const { destination } = req.params;
  const packages = travelPackages?.filter(
    (travel) => travel.destination.toLowerCase() == destination.toLowerCase()
  );
  res.status(200).json({ packages });
};

// Exercise 3: Add a New Booking  (POST)
const addBooking = (req, res) => {
  const { customerName, bookingDate } = req.body;
  const packageId = parseInt(req.body.packageId);
  const seats = parseInt(req.body.seats);

  const bookingId = bookings.length + 1;
  bookings.push({ bookingId, customerName, bookingDate, packageId, seats });
  const booking = bookings.find((booking) => booking.bookingId == bookingId);

  res.status(201).json({ booking });
};

// Exercise 4: Update Available Slots for a Package(POST)
const updatePackage = (req, res) => {
  const packageId = parseInt(req.body.packageId);
  const seatsBooked = parseInt(req.body.seatsBooked);

  const package = travelPackages?.find(
    (package) => package.packageId == packageId
  );
  if (package) {
    package.availableSlots = package.availableSlots - seatsBooked;
  }
  res.status(200).json({ package });
};

// Exercise 5: Retrieve All Bookings for a Package (GET)
const getBookingsByPackageId = (req, res) => {
  const packageId = parseInt(req.params.packageId);
  const bookingsData = bookings?.filter(
    (booking) => booking.packageId === packageId
  );
  res.status(200).json({ bookings: bookingsData });
};

// Routes
app.get("/packages", getTravelPackages);
app.get("/packages/:destination", getTravelPackagesByDestination);
app.post("/bookings", addBooking);
app.post("/packages/update-seats", updatePackage);
app.get("/bookings/:packageId", getBookingsByPackageId);

module.exports = app;
