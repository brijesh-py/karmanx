const users = [];
const books = [];
const reviews = [];

const findValue = (arr, key, value) => {
  let isExists = arr?.find((a) => a[key] == value);
  return isExists;
};

// Utils
const addUser = (user) => {
  user.id = users?.length + 1;
  users?.push(user);
  return user;
};

const addBook = (book) => {
  book.id = books?.length + 1;
  books?.push(book);
  return book;
};

const addReview = (review) => {
  review.id = reviews?.length + 1;
  reviews?.push(review);
  return review;
};

// Exercise 1: Add a New User
const addUserController = (req, res) => {
  const { name, email } = req.body;
  const user = { name, email };
  const isExists = findValue(users, "email", email);
  if (isExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  addUser(user);
  res.status(201).json(user);
};

// Exercise 2: Add a New Book
const addBookController = (req, res) => {
  const { title, author } = req.body;
  const book = { title, author };
  addBook(book);
  res.status(201).json(book);
};

// Exercise 3: Add a New Review
const addReviewController = (req, res) => {
  const { content, userId } = req.body;
  const review = { content, userId };
  addReview(review);
  res.status(201).json(review);
};

module.exports = {
  addUserController,
  addBookController,
  addReviewController,
  addUser,
  addBook,
  addReview,
};
