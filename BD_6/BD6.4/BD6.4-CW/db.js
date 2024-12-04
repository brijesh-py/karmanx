const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];
const reviews = [{ id: 1, bookId: 1, content: "Great book!" }];
const users = [{ id: 1, name: "John Doe", email: "john@example.com" }];

// Utils
// Get All Books
const getBooks = () => books;

// Get Book By Id
const getBookById = (id) => {
  const book = books?.find((book) => book?.id == id);
  return book;
};

// Get Reviews
const getReviews = () => reviews;

// Get Review By Id
const getReviewById = (id) => {
  const review = reviews?.find((review) => review?.id == id);
  return review;
};

// Get Users
const getUserById = (id) => {
  const user = users?.find((user) => user?.id == id);
  return user;
};

module.exports = {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
  getUserById,
};
