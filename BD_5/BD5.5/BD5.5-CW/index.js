const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib");
const User = require("./models/user.model");
const Track = require("./models/track.model");
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

// RESPONSE MESSAGES
const MESSAGES = {
  FETCH_RESOURCE: "Resource retrieved successfully.",
  CREATE_RESOURCE: "Resource created successfully.",
  UPDATE_RESOURCE: "Resource updated successfully.",
  DELETE_RESOURCE: "Resource deleted successfully.",
  REQUIRED: "Required field is missing.",
  NOT_FOUND: "Resource not found.",
  CONFLICT: "Already resource exists",
  BAD_REQUEST: "Invalid request. Please check your input.",
  INTERNAL_SERVER: "An internal server error occurred. Please try again later.",
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
        message: MESSAGES?.INTERNAL_SERVER,
      });
    }
  }
};

// DUMMY DATA
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
// Exercise 1: Like a Track
const likeTrack = (req, res) => {
  const userId = parseInt(req.params.id);
  const trackId = parseInt(req.query?.trackId);
  errorHandler(res, async () => {
    if (isNaN(userId) || isNaN(trackId)) {
      throw new HttpError({ message: "User id and Track id is required" });
    }
    const isLiked = await Like.findOne({ where: { userId, trackId } });
    if (isLiked) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.CONFLICT,
        message: "Track already liked",
      });
    }

    const like = await Like.create({ userId, trackId });
    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Track liked",
      like,
    });
  });
};

// Exercise 2: Dislike a Track
const dislikeTrack = (req, res) => {
  const userId = parseInt(req.params.id);
  const trackId = parseInt(req.query?.trackId);
  errorHandler(res, async () => {
    if (isNaN(userId) || isNaN(trackId)) {
      throw new HttpError({ message: "User id and Track id is required" });
    }
    const isLiked = await Like.destroy({ where: { userId, trackId } });
    if (!isLiked) {
      throw new HttpError({ message: "User or Track not found" });
    }
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Track disliked",
    });
  });
};

// Exercise 3: Get All Liked Tracks
const getLikedTrack = (req, res) => {
  const userId = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(userId)) {
      throw new HttpError({ message: "User id expected as a number" });
    }
    const likes = await Like.findAll({
      where: { userId },
      attributes: ["trackId"],
    });
    if (likes?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No like found",
      });
    }

    const tracks = [];
    likes?.forEach((like) => {
      tracks.push(like?.trackId);
    });
    const likedTracks = await Track.findAll({
      where: { id: { [Op.in]: tracks } },
    });

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      likedTracks,
    });
  });
};

const getLikedTrackByArtist = (req, res) => {
  const userId = parseInt(req.params.id);
  const artist = req.query?.artist;
  errorHandler(res, async () => {
    console.log(userId, artist)
    if (isNaN(userId) || !artist) {
      throw new HttpError({
        message: "User id expected as a number and artist name is required",
      });
    }
    const likes = await Like.findAll({
      where: { userId },
      attributes: ["trackId"],
    });
    if (likes?.length == 0) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: "No like found",
      });
    }

    const tracks = [];
    likes?.forEach((like) => {
      tracks.push(like?.trackId);
    });
    const likedTracks = await Track.findAll({
      where: { id: { [Op.in]: tracks }, artist },
    });

    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      likedTracks,
    });
  });
};

// ROUTES
app.get("/users/:id/like", likeTrack);
app.get("/users/:id/dislike", dislikeTrack);
app.get("/users/:id/liked", getLikedTrack);
app.get("/users/:id/liked-artist", getLikedTrackByArtist);

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Track.bulkCreate(tracksData);
    await User.create({
      username: "testuser",
      email: "testuser@gmail.com",
      password: "testuser",
    });
    await Like.create({ userId: 1, trackId: 1 });

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
