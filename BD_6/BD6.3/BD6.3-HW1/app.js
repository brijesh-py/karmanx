const express = require("express");

const app = express();

app.use(express.json());

const games = [
  {
    id: 1,
    title: "The Legend of Zelda",
    genre: "Adventure",
    developer: "Nintendo",
  },
  {
    id: 2,
    title: "Super Mario Bros",
    genre: "Platformer",
    developer: "Nintendo",
  },
];
const developers = [
  { id: 1, name: "Epic Games", country: "USA" },
  { id: 2, name: "Fee Fire", country: "USA" },
];

const getGames = () => {
  return games;
};

const getGameById = (id) => {
  return games?.find((game) => game?.id === id);
};

const addGame = (game) => {
  game.id = games?.length + 1;
  games?.push(game);
  return game;
};

const getDeveloperById = (id) => {
  return developers?.find((developer) => developer?.id === id);
};

const addDeveloper = (developer) => {
  developer.id = developers?.length + 1;
  developers?.push(developer);
  return developer;
};

app.get("/games", (req, res) => {
  const games = getGames();
  res.status(200).json(games);
});

app.get("/games/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const game = getGameById(id);
  if (!game) {
    return res.status(404).json({ message: "No Game found" });
  }
  res.status(200).json(game);
});

app.post("/games/new", (req, res) => {
  const { title, genre, developer } = req.body;
  const game = addGame({ title, genre, developer });
  res.status(201).json(game);
});

app.get("/developers/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const developer = getDeveloperById(id);
  if (!developer) {
    return res.status(404).json({ message: "No Developer found" });
  }
  res.status(200).json(developer);
});

app.post("/developers/new", (req, res) => {
  const { name, country } = req.body;
  const developer = addDeveloper({ name, country });
  res.status(201).json(developer);
});

module.exports = {
  app,
  getGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
};
