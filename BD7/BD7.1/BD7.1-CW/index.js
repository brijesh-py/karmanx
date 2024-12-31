require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const connectDB = require("./db/db.connect");
const Movie = require("./models/movie.model");

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

connectDB();
const seedMoviesData = async () => {
  const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));
  for (const movie of movies) {
    await Movie.create(movie);
  }
  console.log("Movies seeded successfully");
};
seedMoviesData();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
