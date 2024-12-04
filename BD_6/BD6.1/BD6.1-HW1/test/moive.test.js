const { getMovieById, getMovies, addMovie } = require("../movie");

describe("Movies Functions", () => {
  // Exercise 4: Test get all movies
  it("should be get all movies", () => {
    const movies = getMovies();
    expect(movies?.length).toBe(4);
    expect(movies).toEqual([
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
      { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
      { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino" },
    ]);
  });

  // Exercise 5: Test get movie by ID
  it("should be get a movie by ID", () => {
    const movie = getMovieById(2);
    expect(movie).toEqual({
      id: 2,
      title: "The Godfather",
      director: "Francis Ford Coppola",
    });
  });

  //  Exercise 6: Test get movie by non-existent ID
  it("Should be return undefined by out-of-range movie ID", () => {
    const movie = getMovieById(23);
    expect(movie).toEqual(undefined);
  });

  //   Exercise 7: Test add new movie
  it("Should be return new movie", () => {
    const newMovie = addMovie({
      title: "Kill",
      director: "Nikhil Nagesh Bhat",
    });
    expect(newMovie).toEqual({
      id: 5,
      title: "Kill",
      director: "Nikhil Nagesh Bhat",
    });
    expect(getMovies().length).toBe(5);
  });
});
