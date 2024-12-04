const express = require("express");
const { getGames, getGameById, getGenres, getGenreById } = require("./db");

const app = express();
app.use(express.json());

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
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

// Exercise 1: Get All Games
app.get("/api/games", (req, res) => {
  errorHandler(res, async () => {
    const games = await getGames();
    if (games?.length == 0 || !games) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No games found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(games);
  });
});

// Exercise 2: Get Game by ID
app.get("/api/games/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const game = await getGameById(id);
    if (!game) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No game found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(game);
  });
});

// Exercise 3: Get All Genres
app.get("/api/genres", (req, res) => {
  errorHandler(res, async () => {
    const genres = await getGenres();
    if (genres?.length == 0 || !genres) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No genres found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(genres);
  });
});

// Exercise 4: Get Genre by ID
app.get("/api/genres/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    const genre = await getGenreById(id);
    if (!genre) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No genre found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json(genre);
  });
});

module.exports = app;
