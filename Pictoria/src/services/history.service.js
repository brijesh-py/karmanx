const SearchHistoryModel = require("../../models/search-history");

class SearchHistoryService {
  async save(user, query) {
    const data = { query, userId: user };
    const history = await SearchHistoryModel.create(data);
    return history.toJSON();
  }

  async findAll({ userId, query }) {
    
    const history = await SearchHistoryModel.findAll({
      where: { userId },
    });
    return history;
  }
}

module.exports = new SearchHistoryService();
