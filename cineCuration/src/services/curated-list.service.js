const { curatedList: CuratedListModel } = require("../../models");

class CuratedListService {
  async create({ name, description, slug }) {
    const curatedList = await CuratedListModel.create({
      name,
      description,
      slug,
    });
    return curatedList?.toJSON();
  }
  
  async update(id, { name, description, slug }) {
    const curatedList = await CuratedListModel.update(
      { name, description, slug },
      { where: { id } }
    );
    return curatedList;
  }
}

module.exports = new CuratedListService();
