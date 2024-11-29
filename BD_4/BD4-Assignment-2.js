const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// ROUTERS
const gameRouter = express.Router();
const playerRouter = express.Router();
const tournamentRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use("/games", gameRouter);
app.use("/players", playerRouter);
app.use("/tournaments", tournamentRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// DATABASE CONFIG
let DB;
(async function () {
  try {
    DB = await open({
      filename: "./games_database.sqlite",
      driver: sqlite3?.Database,
    });
  } catch (error) {
    console.error("Database connections failed: " + error?.message);
    process.exit(1);
  }
})();

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
      console.log(error);
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred",
      });
    }
  }
};

// RESPONSE
const responseGames = (res, games) => {
  if (games?.length == 0 || !games) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: "No Games found",
    });
  }
  res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
    status: HTTPS_STATUS_CODES?.RESPONSE_OK,
    message: "Games fetched successfully",
    games,
    hits: games?.length,
  });
};

const responsePlayers = (res, players) => {
  if (players?.length == 0 || !players) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: "No Players found",
    });
  }
  res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
    status: HTTPS_STATUS_CODES?.RESPONSE_OK,
    message: "Players fetched successfully",
    players,
    hits: players?.length,
  });
};

const responseTournaments = (res, tournaments) => {
  if (tournaments?.length == 0 || !tournaments) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: "No Tournaments found",
    });
  }
  res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
    status: HTTPS_STATUS_CODES?.RESPONSE_OK,
    message: "Tournaments fetched successfully",
    tournaments,
    hits: tournaments?.length,
  });
};

// CONTROLLERS
// Exercise 1: Get All Games
const getGames = (req, res) => {
  errorHandler(res, async () => {
    const query = "SELECT * FROM games";
    const games = await DB?.all(query, []);
    responseGames(res, games);
  });
};

// Exercise 2: Get Game by ID
const getGamesById = (req, res) => {
  const id = req.params?.id;
  errorHandler(res, async () => {
    const query = "SELECT * FROM games WHERE id = ?";
    const game = await DB?.all(query, [id]);
    responseGames(res, ...game);
  });
};

// Exercise 3 and 4: Get Games by (FIELD)
const getGamesByProps = (key) => {
  return (req, res) => {
    const value = req.params[key];
    errorHandler(res, async () => {
      const query = `SELECT * FROM games WHERE ${key} = "${value}"`;
      const games = await DB?.all(query, []);
      responseGames(res, games);
    });
  };
};

// Exercise 5: Get Games Sorted by Rating
const getGamesSortedByRating = (req, res) => {
  const lowToHigh = req.query?.lowToHigh == "true";
  errorHandler(res, async () => {
    const isAscend = lowToHigh ? "ASC" : "DESC";
    const query = `SELECT * FROM games ORDER BY rating ${isAscend}`;
    const games = await DB?.all(query, []);
    responseGames(res, games);
  });
};

// Exercise 6: Get All Players
const getPlayers = (req, res) => {
  errorHandler(res, async () => {
    const query = "SELECT * FROM players";
    const players = await DB?.all(query, []);
    responsePlayers(res, players);
  });
};

// Exercise 7: Get Player by ID
const getPlayerById = (req, res) => {
  const id = req.params?.id;
  errorHandler(res, async () => {
    const query = "SELECT * FROM players WHERE id = ?";
    const player = await DB?.all(query, [id]);
    responsePlayers(res, ...player);
  });
};

// Exercise 8: Get Players by (FIELD)
const getPlayersByProps = (key) => {
  return (req, res) => {
    const value = req.params[key];
    errorHandler(res, async () => {
      const query = `SELECT * FROM players WHERE ${key} = "${value}"`;
      const players = await DB?.all(query, []);
      responsePlayers(res, players);
    });
  };
};

// Exercise 9: Get Players Sorted by Rating
const getPlayersSortedByRating = (req, res) => {
  const lowToHigh = req.query?.lowToHigh == "true";
  errorHandler(res, async () => {
    const isAscend = lowToHigh ? "ASC" : "DESC";
    const query = `SELECT * FROM players ORDER BY rating ${isAscend}`;
    const players = await DB?.all(query, []);
    responsePlayers(res, players);
  });
};

// Exercise 10: Get All Tournaments
const getTournaments = (req, res) => {
  errorHandler(res, async () => {
    const query = "SELECT * FROM tournaments";
    const tournaments = await DB?.all(query, []);
    responseTournaments(res, tournaments);
  });
};

// Exercise 11: Get Tournament by ID
const getTournamentById = (req, res) => {
  const id = req.params?.id;
  errorHandler(res, async () => {
    const query = "SELECT * FROM tournaments WHERE id = ?";
    const tournament = await DB?.all(query, [id]);
    responseTournaments(res, ...tournament);
  });
};

// Exercise 12: Get Tournaments by Game ID
const getTournamentByGameId = (req, res) => {
  const gameId = req.params?.gameId;
  errorHandler(res, async () => {
    const query = "SELECT * FROM tournaments WHERE gameId = ?";
    const tournament = await DB?.all(query, [gameId]);
    responseTournaments(res, ...tournament);
  });
};

// Exercise 13: Get Tournaments Sorted by Prize Pool
const getTournamentsSortedByPrizePool = (req, res) => {
  const lowToHigh = req.query?.lowToHigh == "true";
  errorHandler(res, async () => {
    const isAscend = lowToHigh ? "ASC" : "DESC";
    const query = `SELECT * FROM tournaments ORDER BY prizePool ${isAscend}`;
    const tournaments = await DB?.all(query, []);
    responseTournaments(res, tournaments);
  });
};

// ROUTES
// GAMES ROUTES
gameRouter.get("/", getGames);
gameRouter.get("/details/:id", getGamesById);
gameRouter.get("/genre/:genre", getGamesByProps("genre"));
gameRouter.get("/platform/:platform", getGamesByProps("platform"));
gameRouter.get("/sort-by-rating", getGamesSortedByRating);
// PLAYERS ROUTES
playerRouter.get("/", getPlayers);
playerRouter.get("/details/:id", getPlayerById);
playerRouter.get("/platform/:platform", getPlayersByProps("platform"));
playerRouter.get("/sort-by-rating", getPlayersSortedByRating);
// TOURNAMENTS ROUTES
tournamentRouter.get("/", getTournaments);
tournamentRouter.get("/details/:id", getTournamentById);
tournamentRouter.get("/game/:gameId", getTournamentByGameId);
tournamentRouter.get("/sort-by-prize-pool", getTournamentsSortedByPrizePool);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
