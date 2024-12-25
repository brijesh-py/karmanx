const { wishlist: WishListModel } = require("../../models");
const MovieService = require("./movie.service");

class WishListService {
  async save(tmdbId) {
    const movie = await MovieService.save(tmdbId);
    const wishList = await WishListModel.create({ movieId: movie.id });
    return wishList?.toJSON();
  }
}

module.exports = new WishListService();
