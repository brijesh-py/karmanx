const express = require("express");
const { getMovies, getMovieById } = require("./controllers");

const app = express();

app.use(express.json());

// Routes
app.get("/movies", getMovies);
app.get("/movies/:id", getMovieById);

module.exports = app;
