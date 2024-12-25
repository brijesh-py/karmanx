const SearchHistoryService = require("../services/history.service");
const { HttpError, errorHandler } = require("../utils/error-handler");

const getSearchHistory = async (req, res) => {
  const { userId } = req.query;
  errorHandler(res, async () => {
    const searchHistory = await SearchHistoryService.findAll({ userId });

    if (!searchHistory || searchHistory?.length == 0) {
      throw new HttpError({
        res,
        message: "Search history not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Search history found successfully",
      searchHistory,
    });
  });
};

module.exports = { getSearchHistory };
