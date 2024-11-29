const express = require("express");
const { watchList } = require("./data");

const app = express();
const PORT = 3000;

// Constants
const HTTP_STATUS_CODES = {
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
  RESPONSE_OK: 200,
};

// Error Handler
class HttpError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status || HTTP_STATUS_CODES?.BAD_REQUEST_ERROR;
    this.message = message || "some went wrong by user";
  }
}

function errorHandler(res, func) {
  try {
    func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.status).json({
        status: error?.status,
        message: error?.message,
      });
    } else {
      res.status(HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "Internal server error",
      });
    }
  }
}

// Utility
function responseValidate(name) {
  return `${name} is required`;
}

function updateWatchedStatus(watchListArr, watched, id) {
  for (let video in watchListArr) {
    if (!id) {
      watchListArr[video].watched = watched;
    }
    if (watchListArr[video].videoId == id) {
      watchListArr[video].watched = watched;
    }
  }
  return watchListArr;
}

function deleteWatch(watchListArr, id) {
  if (id) {
    watchListArr = watchListArr?.filter((watch) => watch?.videoId != id);
    return watchListArr;
  }
  watchListArr = watchListArr?.filter((watch) => watch?.watched == false);
  return watchListArr;
}

// Routes
// Exercise 1: Update the Watched Status of a Video by ID
app.get("/watchlist/update", (req, res) => {
  const { videoId, watched } = req.query;

  errorHandler(res, () => {
    if (!videoId || !watched) {
      throw new HttpError({
        message: responseValidate("videoId and watchList"),
      });
    }
    const updatedWatchList = updateWatchedStatus(watchList, watched, videoId);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      watchList: updatedWatchList,
    });
  });
});

// Exercise 2: Update the Watched Status of All Videos
app.get("/watchlist/update-all", (req, res) => {
  const watched = req.query?.watched;
  errorHandler(res, () => {
    if (!watched) {
      throw new HttpError({ message: responseValidate("watched") });
    }
    const updatedWatchList = updateWatchedStatus(watchList, watched);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      watchList: updatedWatchList,
    });
  });
});

// Exercise 3: Delete a Video by ID
app.get("/watchlist/delete", (req, res) => {
  const videoId = req.query?.videoId;
  errorHandler(res, () => {
    if (!videoId) {
      throw new HttpError({ message: responseValidate("videoId") });
    }
    const updatedWatchList = deleteWatch(watchList, videoId);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      watchList: updatedWatchList,
    });
  });
});

// Exercise 4: Delete Watched Videos
app.get("/watchlist/delete-watched", (req, res) => {
  errorHandler(res, () => {
    const updatedWatchList = deleteWatch(watchList);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      watchList: updatedWatchList,
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
