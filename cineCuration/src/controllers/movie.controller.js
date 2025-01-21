const axiosInstance = require("../lib/axios.lib");
const {
  CuratedListService,
  WatchListService,
  WishListService,
  CuratedListItemService,
  ReviewService,
  MovieService,
} = require("../services/");

const { HttpError, errorHandler } = require("../utils/error-handler");
const response = require("../utils/response");

class MovieController {
  async searchMovie(req, res) {
    const { query } = req.query;
    errorHandler(res, async () => {
      const movie = await axiosInstance.get(`/search/movie?query=${query}`);
      return response({ res, movies: movie.data });
    });
  }

  async createCuratedList(req, res) {
    const { name, description, slug } = req.body;
    errorHandler(res, async () => {
      const curatedList = await CuratedListService.create({
        name,
        description,
        slug,
      });
      if (!curatedList) {
        throw new HttpError({ res, message: "Curated list not created" });
      }
      response({
        res,
        message: "Curated list created successfully",
        curatedList,
      });
    });
  }

  async updateCuratedList(req, res) {
    const { id } = req.params;
    const { name, description, slug } = req.body;
    errorHandler(res, async () => {
      const curatedList = await CuratedListService.update(id, {
        name,
        description,
        slug,
      });
      if (curatedList != 1) {
        throw new HttpError({ res, message: "Curated list not updated" });
      }
      response({
        res,
        message: "Curated list updated successfully",
        curatedList: { id, name, description, slug },
      });
    });
  }

  async addWatchList(req, res) {
    const { movieId } = req.body;
    errorHandler(res, async () => {
      const watchList = await WatchListService.save(movieId);
      if (!watchList) {
        throw new HttpError({ res, message: "Movie not added" });
      }
      response({ res, message: "Movie added successfully", watchList });
    });
  }

  async addWishList(req, res) {
    const { movieId } = req.body;
    errorHandler(res, async () => {
      const wishList = await WishListService.save(movieId);
      if (!wishList) {
        throw new HttpError({ res, message: "Movie not added" });
      }
      response({ res, message: "Movie added successfully", wishList });
    });
  }

  async addCuratedListItem(req, res) {
    const { movieId, curatedListId } = req.body;
    errorHandler(res, async () => {
      const curatedListItem = await CuratedListItemService.save({
        movieId,
        curatedListId,
      });
      if (!curatedListItem) {
        throw new HttpError({ res, message: "Curated List Item not added" });
      }
      response({
        res,
        message: "Curated List Item added successfully",
        curatedListItem,
      });
    });
  }

  async addReview(req, res) {
    const { movieId } = req.params;
    const { rating, reviewText } = req.body;
    errorHandler(res, async () => {
      const review = await ReviewService.addReview({
        movieId,
        rating: parseFloat(rating),
        reviewText,
      });
      if (!review) {
        throw new HttpError({ res, message: "Review not added" });
      }
      response({ res, message: "Review added successfully", review });
    });
  }

  async searchMovieByGenreAndActor(req, res) {
    const { genre, actor } = req.query;
    errorHandler(res, async () => {
      const movies = await MovieService.findAll({ genre, actors: actor });
      if (!movies) {
        throw new HttpError({
          res,
          message: "Movies not found",
          status: 404,
        });
      }
      return response({ res, movies });
    });
  }

  async sortedMoviesByRatingOrYear(req, res) {
    const { sortBy, order, list } = req.query;
    errorHandler(res, async () => {
      const movies = await MovieService.sort(["rating"]);
      response({ res, movies });
    });
  }

  async getTopMovies(req, res) {
    errorHandler(res, async () => {
      const movies = await MovieService.top(["rating"]);
      response({ res, movies, message: "Top 5 Movies." });
    });
  }
}

module.exports = new MovieController();
