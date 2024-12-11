const games = [];
const tournaments = [];

// Exercise 1: Add a New Game
const addGame = (req, res) => {
  const { title, genre } = req.body;
  const game = { title, genre };
  game.id = games?.length + 1;
  games?.push(game);
  res.status(201).json(game);
};

// Exercise 2: Add a New Tournament
const addTournament = (req, res) => {
  const { name, gameId } = req.body;
  const tournament = { name, gameId };
  tournament.id = tournaments?.length + 1;
  tournaments?.push(tournament);
  res.status(201).json(tournament);
};

module.exports = { addGame, addTournament };
