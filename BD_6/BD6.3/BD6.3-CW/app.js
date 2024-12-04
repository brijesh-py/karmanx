const express = require("express");

const app = express();

app.use(express.json());

const reviews = [
  { id: 1, content: "Great product!", userId: 1 },
  { id: 2, content: "Not bad, could be better.", userId: 2 },
];
const users = [
  { id: 1, name: "Sam Ahmed", email: "sam-ahmed@gamil.com" },
  { id: 2, name: "John Doe", email: "john.doe@duck.com" },
];

const getReviews = () => {
  return reviews;
};

const getReviewById = (id) => {
  return reviews?.find((review) => review?.id === id);
};

const addReview = (review) => {
  review.id = reviews?.length + 1;
  reviews?.push(review);
  return review;
};

const getUserById = (id) => {
  return users?.find((user) => user?.id === id);
};

const addUser = (user) => {
  user.id = users?.length + 1;
  users?.push(user);
  return user;
};

app.get("/reviews", (req, res) => {
  const reviews = getReviews();
  res.status(200).json(reviews);
});

app.get("/reviews/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const review = getReviewById(id);
  if (!review) {
    return res.status(404).json({ message: "No Review found" });
  }
  res.status(200).json(review);
});

app.post("/reviews/new", (req, res) => {
  const content = req.body?.content;
  const userId = parseInt(req.body?.userId);
  const review = addReview({ content, userId });
  res.status(201).json(review);
});

app.get("/users/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = getUserById(id);
  if (!user) {
    return res.status(404).json({ message: "No User found" });
  }
  res.status(200).json(user);
});

app.post("/users/new", (req, res) => {
  const { name, email } = req.body;
  const user = addUser({ name, email });
  res.status(201).json(user);
});

module.exports = {
  app,
  getReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
};
