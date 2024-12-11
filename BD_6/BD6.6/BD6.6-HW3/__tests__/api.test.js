const request = require("supertest");
const http = require("http");
const app = require("../app");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Tests", () => {
  describe("GET /books", () => {
    // Exercise 3: Test Retrieve All Books
    it("should return all books", async () => {
      const books = [
        {
            'bookId': 1,
            'title': 'To Kill a Mockingbird',
            'author': 'Harper Lee',
            'genre': 'Fiction'
        },
        {
            'bookId': 2,
            'title': '1984',
            'author': 'George Orwell',
            'genre': 'Dystopian'
        },
        {
            'bookId': 3,
            'title': 'The Great Gatsby',
            'author': 'F. Scott Fitzgerald',
            'genre': 'Classic'
        }
    ]
      const response = await request(app).get("/books");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ books });
    });

    // Exercise 4: Test Retrieve Book by ID
    it("should return a specific book by Id", async () => {
      const book = {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      };

      const response = await request(app).get("/books/2");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ book });
    });
  });
});
