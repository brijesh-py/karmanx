const UserService = require("../services/user.service");
const { HttpError, errorHandler } = require("../utils/error-handler");

const createUser = (req, res) => {
  const { username, email } = req.body;
  errorHandler(res, async () => {
    const user = await UserService.create({ username, email });
    if (!user) {
      throw new HttpError({
        status: 409,
        message:
          "Email or username already exists, try another email or username",
      });
    }

    res.status(201).json({
      status: 201,
      message: "User created successfully",
      user,
    });
  });
};

module.exports = { createUser };
