const { Op, or } = require("sequelize");
const { movie: MovieModel } = require("../../models");
const { getMovieByTMDBId, getCastDetailsByTMDBId } = require("../utils/movie");

class MovieService {
  async save(tmdbId) {
    const movieExist = await this.findOne({ tmdbId });
    if (movieExist) return movieExist;

    const {
      title,
      genres,
      release_year,
      vote_average: rating,
      overview: description,
    } = await getMovieByTMDBId(tmdbId);
    const movieCreditsData = await getCastDetailsByTMDBId(tmdbId);
console.log(movieCreditsData.cast)
    const movieData = {
      title,
      releaseYear: release_year,
      rating,
      description,
      tmdbId,
    };
    movieData.genre = genres
      ?.map((genre) => genre.name)
      .join(", ")
      ?.toLocaleLowerCase();

    movieData.actors = movieCreditsData?.cast
      ?.map((movieCreditData) => movieCreditData.name)
      .join(", ")
      ?.toLocaleLowerCase();
    const movie = await MovieModel.create(movieData);
    return movie?.toJSON();
  }

  async findOne(query) {
    const movie = await MovieModel.findOne({ where: { ...query } });
    return movie?.toJSON();
  }

  async findAll({ genre = "", actors = "" }) {
    const movies = await MovieModel.findAll({
      where: {
        genre: {
          [Op.like]: `%${genre?.toLocaleLowerCase()}%`,
        },
        actors: {
          [Op.like]: `%${actors?.toLocaleLowerCase()}%`,
        },
      },
    });
    return movies;
  }

  async sort(arr = ["rating"], ASC = true) {
    const queries = arr.map((key) => [key, ASC ? "ASC" : "DESC"]);
    const movies = await MovieModel.findAll({ order: queries });
    return movies;
  }

  async top(arr = ["rating"], limit = 10, ASC = true) {
    const queries = arr.map((key) => [key, ASC ? "ASC" : "DESC"]);
    const movies = await MovieModel.findAll({
      order: queries,
      limit,
    });
    return movies;
  }
}

module.exports = new MovieService();
