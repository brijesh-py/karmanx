const { app, getMovies, getMovieById, addMovie } = require("../app");
const http = require("http");

jest.mock("../app", () => ({
  ...jest.requireActual("../app"),
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
  addMovie: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
}, 10000);

afterAll((done) => {
  server.close(done);
}, 10000);

describe("Functions Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 4: Test get all Movies
  test("Get Movies should return an Movies list", () => {
    const mockMovies = [
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
    ];
    getMovies.mockReturnValue(mockMovies);

    let movies = getMovies();
    expect(movies).toEqual(mockMovies);
    expect(getMovies).toHaveBeenCalled();
  });

  // Exercise 5: Test get Movie by ID
  test("Get Movie by ID should return an Movie", () => {
    const mockMovie = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    };
    getMovieById.mockReturnValue(mockMovie);

    let movie = getMovieById(1);
    expect(movie).toEqual(mockMovie);
    expect(getMovieById).toHaveBeenCalledWith(1);
  });

  // Exercise 6: Test get Movie by non-existent ID
  test("Get Movie by Id should return undefined", () => {
    getMovieById.mockReturnValue(undefined);

    let movie = getMovieById(4);
    expect(movie).toBeUndefined();
    expect(getMovieById).toHaveBeenCalledWith(4);
  });

  // Exercise 7: Test add New Movie
  test("Add Movie: ID, Name and Book should return a new Movie", () => {
    const mockMovie = {
      id: 4,
      title: "Kill",
      director: "Unknown",
    };
    addMovie.mockReturnValue(mockMovie);

    let movie = addMovie(mockMovie);
    expect(movie).toEqual(mockMovie);
    expect(addMovie).toHaveBeenCalledWith(mockMovie);
  });
});
