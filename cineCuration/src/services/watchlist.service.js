const { watchlist: WatchListModel } = require("../../models");
const MovieService = require("./movie.service");

class WatchListService {
  async save(tmdbId) {
    const movie = await MovieService.save(tmdbId);
    if(!movie) return null;
    
    const watchList = await WatchListModel.create({ movieId: movie.id });
    return watchList?.toJSON();
  }
}

module.exports = new WatchListService();
