const express = require("express");
const { getGame, getGameById } = require("./controllers");

const app = express();

app.use(express.json());

// Routes
app.get("/games", getGame);
app.get("/games/:id", getGameById);

module.exports = app;
