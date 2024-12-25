const sequelize = require("./config/db");
// sequelize.sync({ force: true });

const User = require("./models/user");
const Post = require("./models/post");

const createUser = async () => {
  const save = await User.create({
    username: "test",
    email: "test",
    password: "test",
  });

  console.log(save);
};

const createPost = async () => {
  const save = await Post.create({
    title: "test",
    desc: "test",
    user_id: 2,
  });

  console.log(save);
};
const getPosts = async () => {
  const posts = await Post.findAll({
    include: {
      model: User,
      attributes: ["username"],
    },
    where: {
      user_id: 0,
    },
  });

  console.log(JSON.parse(JSON.stringify(posts)));
};

// createUser();
// createPost();
getPosts();
