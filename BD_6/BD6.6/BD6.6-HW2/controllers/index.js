const games = [
  {
    gameId: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    genre: "Adventure",
    platform: "Nintendo Switch",
  },
  {
    gameId: 2,
    title: "Red Dead Redemption 2",
    genre: "Action",
    platform: "PlayStation 4",
  },
  {
    gameId: 3,
    title: "The Witcher 3: Wild Hunt",
    genre: "RPG",
    platform: "PC",
  },
];

// Exercise 1: Retrieve All Games
const getGame = (req, res) => {
  res.json({ games });
};

// Exercise 2: Retrieve Game by ID
const getGameById = (req, res) => {
  const gameId = parseInt(req.params.id);
  const game = games.find((ele) => ele.gameId === gameId);
  if (game) {
    res.json({ game });
  } else {
    res.status(404).json({ error: "game not found" });
  }
};

module.exports = { getGame, getGameById };
