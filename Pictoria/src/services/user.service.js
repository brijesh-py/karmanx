const { where } = require("sequelize");
const UserModel = require("../../models/user");

class UserService {
  constructor() {}
  async create({ username, email }) {
    const existingUser = await this.find({ username, email });
    if (existingUser) return null;

    const user = await UserModel.create({ username, email });
    return user;
  }

  async find({ username, email }) {
    const user = await UserModel.findOne({
      where: {
        username,
        email,
      },
    });
    return user;
  }
}

module.exports = new UserService();
