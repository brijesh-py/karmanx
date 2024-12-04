const { addBook, getBookById, getBooks } = require("../book");

describe("Books Functions", () => {
  // Exercise 4: Test get all books
  it("Should get all books", () => {
    let books = getBooks();
    expect(books.length).toBe(4);
    expect(books).toEqual([
      { id: 1, title: "1984", author: "George Orwell" },
      { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
      { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
      { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee" },
    ]);
  });

  // Exercise 5: Test get book by ID
  it("Should get a Book by Id", () => {
    let book = getBookById(1);
    expect(book).toEqual({ id: 1, title: "1984", author: "George Orwell" });
  });

  // Exercise 6: Test get book by non-existent ID
  it("Should return undefined by out-of-range book ID", () => {
    let book = getBookById(11);
    expect(book).toEqual(undefined);
  });

  // Exercise 7: Test add new book
  it("Should be add new book and return new book", () => {
    const addedBook = addBook({ title: "The Dark", author: "Unknown" });
    expect(addedBook).toEqual({ id: 5, title: "The Dark", author: "Unknown" });
    expect(getBooks().length).toBe(5)
  });
});
