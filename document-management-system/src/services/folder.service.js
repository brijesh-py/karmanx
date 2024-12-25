const FolderModel = require("../../models/folder");

class FolderService {
  async create({ name, type, maxFileLimit }) {
    const folderExists = await this.findOne({ name });
    if (folderExists) return { error: "Folder already exists" };

    const folder = await FolderModel.create({ name, type, maxFileLimit });
    return folder?.toJSON();
  }

  async findOne(query) {
    if (!query) return { error: "Query is required" };
    const folder = await FolderModel.findOne({ where: { ...query } });
    return folder?.toJSON();
  }

  async findAll(query) {
    const folders = await FolderModel.findAll({ where: { ...query } });
    return folders?.map((folder) => folder.toJSON());
  }

  async update(id, query) {
    const folderExists = await this.findOne({ folderId: id });
    if (!folderExists) return { error: "Folder does not exist" };

    const folder = await FolderModel.update(query, { where: { folderId: id } });
    return folder == 1;
  }

  async delete(id) {
    const folderExists = await this.findOne({ folderId: id });
    if (!folderExists) return { error: "Folder does not exist" };

    const deleted = await FolderModel.destroy({ where: { folderId: id } });
    return deleted == 1 ? true : { error: "Folder not deleted" };
  }
}

module.exports = new FolderService();
