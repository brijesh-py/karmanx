const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib");
const User = require("./models/user.model");
const Movie = require("./models/movie.model");
const Like = require("./models/like.model");
const { Op } = require("sequelize");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// ERROR HANDLING
class HttpError extends Error {
  constructor({
    status = HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR,
    message = "An error occurred",
  }) {
    super(message);
    this.status = status;
  }
}
const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (process.env.ENV != "development") {
      console.log(error);
    }
    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred",
      });
    }
  }
};

// DUMMY DATA
const moviesData = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2010,
    summary:
      "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: "Crime",
    year: 1972,
    summary:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    genre: "Crime",
    year: 1994,
    summary:
      "The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.",
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: "Action",
    year: 2008,
    summary:
      "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    genre: "Drama",
    year: 1994,
    summary:
      "The presidencies of Kennedy and Johnson, the Vietnam War, and other events unfold from the perspective of an Alabama man with an IQ of 75.",
  },
];

// CONTROLLERS
// Exercise 1: Like a Movie
const likeMovie = (req, res) => {
  const userId = parseInt(req.params.id);
  const movieId = parseInt(req.query?.movieId);
  errorHandler(res, async () => {
    if (isNaN(userId) || isNaN(movieId)) {
      throw new HttpError({
        message: "User id and Movie id is expected as a number",
      });
    }

    const isLiked = await Like.findOne({ where: { userId, movieId } });
    if (isLiked) {
      throw new HttpError({ message: "Movie already liked" });
    }

    const liked = await Like.create({ userId, movieId });
    if (!liked) {
      throw new HttpError({ message: "User or Movie not found" });
    }

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Movie Liked",
      liked,
    });
  });
};

// Exercise 2: Dislike a Movie
const dislikeMovie = (req, res) => {
  const userId = parseInt(req.params.id);
  const movieId = parseInt(req.query?.movieId);
  errorHandler(res, async () => {
    if (isNaN(userId) || isNaN(movieId)) {
      throw new HttpError({
        message: "User id and Movie id is expected as a number",
      });
    }

    const disliked = await Like.destroy({ where: { userId, movieId } });
    if (!disliked) {
      throw new HttpError({ message: "User or Movie not found" });
    }

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Movie disliked",
    });
  });
};

// Exercise 3: Get All Liked Movies
const getLikedMovies = (req, res) => {
  const userId = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(userId)) {
      throw new HttpError({ message: "User id is expected as a number" });
    }

    const likes = await Like.findAll({ where: { userId } });
    if (likes?.length == 0 || !likes) {
      throw new HttpError({ message: "No like found" });
    }

    const movies = [];
    likes?.forEach((like) => {
      movies.push(like.movieId);
    });

    const likedMovies = await Movie.findAll({
      where: { id: { [Op.in]: movies } },
    });

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      likedMovies,
    });
  });
};

// ROUTES
app.get("/users/:id/like", likeMovie);
app.get("/users/:id/dislike", dislikeMovie);
app.get("/users/:id/liked", getLikedMovies);

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Movie.bulkCreate(moviesData);
    await User.create({
      username: "moviefan",
      email: "moviefan@gmail.com",
      password: "password123",
    });
    await Like.create({ userId: 1, movieId: 1 });

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
