const { Router } = require("express");
const MovieController = require("../controllers/movie.controller");

const router = Router();

// routes
router.post("/movies/watchlist", MovieController.addWatchList);
router.get("/movies/search", MovieController.searchMovie);
router.post("/curated-lists", MovieController.createCuratedList);
router.put("/curated-lists/:id", MovieController.updateCuratedList);
router.post("/movies/wishlist", MovieController.addWishList);
router.post("/movies/curated-list", MovieController.addCuratedListItem);
router.post("/movies/:movieId/reviews", MovieController.addReview);
router.get(
  "/movies/searchByGenreAndActor",
  MovieController.searchMovieByGenreAndActor
);
router.get(
  "/movies/sort",
  MovieController.sortedMoviesByRatingOrYear
);
router.get("/movies/top5", MovieController.getTopMovies);

module.exports = router;
