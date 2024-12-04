const express = require("express");

const app = express();

app.use(express.json())

const movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

const getMovies = () => {
  return movies;
};

const getMovieById = (id) => {
  return movies?.find((movie) => movie?.id === id);
};

const addMovie = (movie) => {
  movies?.push(movie);
  return movie;
};

// Exercise 1: Get all movies
app.get("/movies", (req, res) => {
  res.json(getMovies());
});

// Exercise 2: Get movie by ID
app.get("/movies/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = getMovieById(id);
  if (!movie) {
    return res.status(404).json({ message: "No Movie found." });
  }
  res.json(movie);
});

// Exercise 3: Add new movie
app.post("/movies/new", (req, res) => {
  const { title, director } = req.body;
  const id = parseInt(req.body?.id);
  const movie = addMovie({ id, title, director });
  res.status(201).json(movie);
});

module.exports = { app, getMovies, getMovieById, addMovie };
