const express = require("express");
const { getShows, getShowById, addShow } = require("./controllers");
const { validateInput } = require("./utils");

const app = express();

app.use(express.json());

// Routes
app.get("/shows", getShows);
app.get("/shows/:id", getShowById);
app.post(
  "/shows",
  validateInput([
    ["title"],
    ["theatreId", "number"],
    ["time", "string"],
  ]),
  addShow
);

module.exports = app;
