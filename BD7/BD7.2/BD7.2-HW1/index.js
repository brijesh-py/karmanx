require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const connectDB = require("./db/db.connect");
const Book = require("./models/book.model");

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

connectDB();
const seedData = async () => {
  const books = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
  for (const book of books) {
    await Book.create(book);
  }
  console.log("Books seeded successfully");
};
seedData();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
