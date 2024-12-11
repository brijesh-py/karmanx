const { HTTP_STATUS_CODES, HttpError, errorHandler } = require("../utils");
const theatres = [
  { theatreId: 1, name: "Regal Cinemas", location: "Downtown" },
  { theatreId: 2, name: "AMC Theatres", location: "Midtown" },
  { theatreId: 3, name: "Cinemark", location: "Uptown" },
];

const shows = [
  { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
  { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
  { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
  { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
];

// Exercise 1: Get All Shows
const getShows = (req, res) => {
  errorHandler(res, async () => {
    res.status(HTTP_STATUS_CODES.OK).json({
      shows,
    });
  });
};

// Exercise 2: Get Show by ID
const getShowById = (req, res) => {
  const showId = parseInt(req.params.id);
  errorHandler(res, async () => {
    const show = shows.find((ele) => ele.showId === showId);
    if (!show) {
      throw new HttpError({
        status: HTTP_STATUS_CODES.NOT_FOUND,
        message: `Show with id ${showId} not found`,
      });
    }
    res.status(HTTP_STATUS_CODES.OK).json({
      show,
    });
  });
};

// Exercise 3: Add a New Show
const addShow = (req, res) => {
  const { title, theatreId, time } = req.body;
  errorHandler(res, async () => {
    const show = { title, theatreId, time };
    show.showId = shows?.length + 1;
    await shows?.push(show);
    res.status(HTTP_STATUS_CODES.CREATE).json({
      show,
    });
  });
};

module.exports = { getShows, getShowById, addShow };
