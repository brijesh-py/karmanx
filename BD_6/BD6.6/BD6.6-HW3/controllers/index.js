const books = [
  {
    bookId: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
  {
    bookId: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
  },
  {
    bookId: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
  },
];

// Exercise 1: Retrieve All Books
const getBook = (req, res) => {
  res.json({ books });
};

// Exercise 2: Retrieve Book by ID
const getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((ele) => ele.bookId === bookId);
  if (book) {
    res.json({ book });
  } else {
    res.status(404).json({ error: "book not found" });
  }
};

module.exports = { getBook, getBookById };
