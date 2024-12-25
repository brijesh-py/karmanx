const { curatedListItem: CuratedListItemModel } = require("../../models");
const MovieService  = require("./movie.service");

class CuratedListItemService {
  async save(data) {
    const movie = await MovieService.findOne(data.movieId);
    const result = await CuratedListItemModel.create({
      movieId: movie.id,
      curatedListId: data.curatedListId,
    });
    return result;
  }
}

module.exports = new CuratedListItemService();
