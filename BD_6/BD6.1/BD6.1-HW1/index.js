const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getMovies, getMovieById, addMovie } = require("./movie");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser());

// Controllers
// Exercise 1: Get all movies
app.get("/movies", (req, res) => {
  const movies = getMovies();
  res.status(200).json({
    status: 200,
    movies,
  });
});

// Exercise 2: Get movie by ID
app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = getMovieById(id);
  res.status(200).json({
    status: 200,
    movie,
  });
});

// Exercise 3: Add new movie
app.post("/movies/", (req, res) => {
  const { title, director } = req.body;
  const newMovie = addMovie({ title, director });
  res.status(201).json({
    status: 201,
    newMovie,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
