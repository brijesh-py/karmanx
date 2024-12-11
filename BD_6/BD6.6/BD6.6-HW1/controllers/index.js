const movies = [
  {
    movieId: 1,
    title: "Inception",
    genre: "Sci-Fi",
    director: "Christopher Nolan",
  },
  {
    movieId: 2,
    title: "The Shawshank Redemption",
    genre: "Drama",
    director: "Frank Darabont",
  },
  {
    movieId: 3,
    title: "The Godfather",
    genre: "Crime",
    director: "Francis Ford Coppola",
  },
];

// Exercise 1: Retrieve All Movies
const getMovies = (req, res) => {
  res.json(movies);
};

// Exercise 2: Retrieve Movie by ID
const getMovieById = (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((emp) => emp.movieId === movieId);
  if (movie) {
    res.json({ movie });
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
};

module.exports = { getMovies, getMovieById };
