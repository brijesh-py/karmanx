const articles = [
  {
    id: 1,
    title: "Understanding JavaScript",
    content:
      "JavaScript is a versatile language used for both frontend and backend development.",
  },
  {
    id: 2,
    title: "Introduction to React",
    content:
      "React is a popular JavaScript library for building user interfaces.",
  },
];

const authors = [
  {
    id: 1,
    name: "John Doe",
    articleId: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    articleId: 2,
  },
];

// Exercise 1 : Add a New Article
const addArticle = (req, res) => {
  const { title, content } = req.body;
  const article = { title, content };
  article.id = articles?.length + 1;
  articles?.push(article);
  res.status(201).json(article);
};

// Exercise 2: Add a New Author
const addAuthor = (req, res) => {
  const { name, articleId } = req.body;
  const author = { name, articleId };
  author.id = authors?.length + 1;
  authors?.push(author);
  res.status(201).json(author);
};

module.exports = { addArticle, addAuthor };
