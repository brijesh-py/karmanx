const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

// Constants
const HTTP_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// Dummy Data
const watchList = [
  {
    videoId: 1,
    title: 'JavaScript Tutorial',
    watched: false,
    url: 'https://youtu.be/shorturl1',
  },
  {
    videoId: 2,
    title: 'Node.js Basics',
    watched: true,
    url: 'https://youtu.be/shorturl2',
  },
  {
    videoId: 3,
    title: 'React.js Guide',
    watched: false,
    url: 'https://youtu.be/shorturl3',
  },
];
const tasks = [
  { taskId: 1, title: 'Buy groceries', completed: false },
  { taskId: 2, title: 'Walk the dog', completed: false },
  { taskId: 3, title: 'Do laundry', completed: true },
];
const books = [
  { bookId: 1, title: '1984', available: true },
  { bookId: 2, title: 'Brave New World', available: true },
  { bookId: 3, title: 'Fahrenheit 451', available: false },
];

// Error Handler
class HttpError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status || HTTP_STATUS_CODES?.BAD_REQUEST_ERROR;
  }
}

function errorHandler(res, func) {
  try {
    func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.status).json({
        status: error?.status,
        message: error?.message || 'some went wrong',
      });
    } else {
      res.status(HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || 'Internal server error',
      });
    }
  }
}

// Utils
function deleteUnwatchedVideos(watchListArr) {
  return watchListArr?.filter((watch) => watch?.watched);
}

function markVideoAsFavorite(watchListArr, videoId, isFavorite) {
  return watchListArr?.map((watch) =>
    watch?.videoId == videoId ? { ...watch, isFavorite } : watch
  );
}

function updateTaskStatusById(taskArr, taskId, completed) {
  return taskArr?.map((task) =>
    task?.taskId == taskId ? { ...task, completed } : task
  );
}

function removeCompletedTasks(taskArr) {
  return taskArr?.filter((task) => !task?.completed);
}

function updateBookAvailabilityById(bookArr, bookId, available) {
  return bookArr?.map((book) =>
    book?.bookId == bookId ? { ...book, available } : book
  );
}

// Routes
// Exercise 1: Remove All Unwatched Videos
app.get('/watchlist/delete-unwatched', (req, res) => {
  errorHandler(res, () => {
    const updateWatchList = deleteUnwatchedVideos(watchList);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      watchedList: updateWatchList,
    });
  });
});

// Exercise 2: Mark Video as Favorite by ID
app.get('/watchlist/favorite', (req, res) => {
  const videoId = req.query?.videoId;
  const isFavorite = req.query?.isFavorite == 'true';
  errorHandler(res, () => {
    if (!videoId) {
      throw new HttpError({ message: 'videoId is required' });
    }

    const updateWatchList = markVideoAsFavorite(watchList, videoId, isFavorite);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      watchedList: updateWatchList,
    });
  });
});

// Example 3: Update Task Status by ID
app.get('/tasks/update', (req, res) => {
  const completed = req.query?.completed == 'true';
  const taskId = req.query?.taskId;
  errorHandler(res, () => {
    if (!taskId) {
      throw new HttpError({ message: 'taskId is required' });
    }
    const updatedTasks = updateTaskStatusById(tasks, taskId, completed);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      tasks: updatedTasks,
    });
  });
});

// Example 4: Remove Completed Tasks
app.get('/tasks/remove-completed', (req, res) => {
  errorHandler(res, () => {
    const updatedTasks = removeCompletedTasks(tasks);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      tasks: updatedTasks,
    });
  });
});

// Example 5: Update Library Book Availability by ID
app.get('/library/update', (req, res) => {
  const available = req.query?.available == 'true';
  const bookId = req.query?.bookId;
  errorHandler(res, () => {
    if (!bookId) {
      throw new HttpError({ message: 'bookId is required' });
    }
    const updatedLibrary = updateBookAvailabilityById(books, bookId, available);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      library: updatedLibrary,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
