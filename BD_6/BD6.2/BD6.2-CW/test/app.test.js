const { app, getAuthors, getAuthorById, addAuthor } = require("..");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAuthors: jest.fn(),
  getAuthorById: jest.fn(),
  addAuthor: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Get Authors should return an Authors list", () => {
    const mockAuthors = [];
    getAuthors.mockReturnValue(mockAuthors);

    let authors = getAuthors();
    expect(authors).toEqual(mockAuthors);
    expect(getAuthors).toHaveBeenCalled();
  });

  test("Get Author by ID should return an Author", () => {
    const mockAuthor = { id: 1, name: "John Doe" };
    getAuthorById.mockReturnValue(mockAuthor);

    let author = getAuthorById(1);
    expect(author).toEqual(mockAuthor);
    expect(getAuthorById).toHaveBeenCalledWith(1);
  });

  test("Get Author by Id should return undefined", () => {
    getAuthorById.mockReturnValue(undefined);

    let author = getAuthorById(4);
    expect(author).toBeUndefined();
    expect(getAuthorById).toHaveBeenCalledWith(4);
  });

  test("Add Author: ID, Name and Book should return a new Author", () => {
    const mockAuthor = { authorId: 4, name: "John Doe", book: "Test Book" };
    addAuthor.mockReturnValue(mockAuthor);

    let author = addAuthor(mockAuthor);
    expect(author).toEqual(mockAuthor);
    expect(addAuthor).toHaveBeenCalledWith(mockAuthor);
  });
});
