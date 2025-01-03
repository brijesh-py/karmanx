const sqlite3 = require('sqlite3').verbose();
const dbPath = './travelEase.db'; // Update this line with your desired folder path
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
});

// SQL Queries for creating tables
const createDestinationsTable = `
  CREATE TABLE IF NOT EXISTS destinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    type TEXT NOT NULL,
    averageCost INTEGER NOT NULL,
    rating REAL NOT NULL,
    isPopular TEXT NOT NULL
  );
`;

const createBookingsTable = `
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    destination TEXT NOT NULL,
    user TEXT NOT NULL,
    cost INTEGER NOT NULL,
    status TEXT NOT NULL,
    date TEXT NOT NULL
  );
`;

// SQL Queries for inserting data
const insertDestinations = `
  INSERT INTO destinations (name, country, type, averageCost, rating, isPopular)
  VALUES 
    ('Paris', 'France', 'International', 1500, 4.8, 'true'),
    ('Manali', 'India', 'Domestic', 500, 4.6, 'true');
`;

const insertBookings = `
  INSERT INTO bookings (destination, user, cost, status, date)
  VALUES
    ('Paris', 'John Doe', 2000, 'Confirmed', '2025-01-01'),
    ('Manali', 'Jane Smith', 800, 'Pending', '2025-01-05');
`;

db.serialize(() => {
  // Create tables
  db.run(createDestinationsTable, (err) => {
    if (err) {
      console.error('Error creating destinations table:', err.message);
    }
  });

  db.run(createBookingsTable, (err) => {
    if (err) {
      console.error('Error creating bookings table:', err.message);
    }
  });

  // Insert data into tables
  db.run(insertDestinations, (err) => {
    if (err) {
      console.error('Error inserting destinations:', err.message);
    }
  });

  db.run(insertBookings, (err) => {
    if (err) {
      console.error('Error inserting bookings:', err.message);
    }
  });
});

// Close the database connection after setup
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database setup complete and connection closed.');
  }
});
