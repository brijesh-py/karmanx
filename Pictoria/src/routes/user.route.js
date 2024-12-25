const { Router } = require("express");
const { createUser } = require("../controllers/user.controller");
const validator = require("../utils/validate-input");

const userRouter = Router();

userRouter.post(
  "/register",
  validator([
    ["username", "string"],
    ["email", "string"],
  ]),
  createUser
);

module.exports = userRouter;
