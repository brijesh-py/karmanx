const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./lib");
const Track = require("./models/track.model");
const { where } = require("sequelize");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

// TRACK ROUTER
const trackRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser());
app.use("/tracks", trackRouter);

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

// RESPONSE
const responseTracks = ({
  res,
  tracks,
  status = HTTPS_STATUS_CODES?.RESPONSE_OK,
  message = "Tracks retrieve successfully",
}) => {
  if (tracks?.length == 0 || !tracks) {
    throw new HttpError({
      status: HTTPS_STATUS_CODES?.NOT_FOUND,
      message: "No tracks found",
    });
  }
  res.status(status).json({
    message,
    status,
    tracks,
  });
};

// Dummy Movies Data
const tracksData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

// CONTROLLERS
// Exercise 1: Fetch all tracks
const getTracks = (req, res) => {
  errorHandler(res, async () => {
    const tracks = await Track.findAll();
    responseTracks({ res, tracks });
  });
};

// Exercise 2: Add a new track in the database
const createTrack = (req, res) => {
  const { name, genre, release_year, artist, album, duration } = req.body;
  errorHandler(res, async () => {
    const newTrack = {
      name,
      genre,
      release_year: parseInt(release_year),
      artist,
      album,
      duration: parseInt(duration),
    };

    await Track.create(newTrack);
    responseTracks({
      res,
      tracks: newTrack,
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
    });
  });
};

// Exercise 3: Update track information
const updateTrack = (req, res) => {
  const { name, genre, artist, album } = req.body;
  const trackId = req.params.id;
  const release_year = parseInt(req.body?.release_year);
  const duration = parseInt(req.body?.duration);

  errorHandler(res, async () => {
    if (!trackId) {
      throw new HttpError({ message: "track id expected as number" });
    }
    const track = {
      name,
      genre,
      release_year,
      duration,
      artist,
      album,
    };

    await Track.update(track, { where: { id: trackId } });
    responseTracks({
      res,
      tracks: track,
      message: "Track updated successfully",
    });
  });
};

// Exercise 4: Delete a track from the database
const deleteTrack = (req, res) => {
  const trackId = parseInt(req.query?.id);
  errorHandler(res, async () => {
    if (isNaN(trackId) || !trackId) {
      throw new HttpError({ message: "track id expected as number" });
    }

    const track = await Track.destroy({ where: { id: trackId } });
    if (track == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "Track id not found",
      });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Track deleted successfully",
    });
  });
};

// ROUTES
trackRouter.get("/", getTracks);
trackRouter.post("/new", createTrack);
trackRouter.put("/update/:id", updateTrack);
trackRouter.delete("/delete/", deleteTrack);

// SEED TRACKS DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Track.bulkCreate(tracksData);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Movies seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
