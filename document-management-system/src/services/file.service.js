const FileModel = require("../../models/file");
const FolderService = require("./folder.service");

class FileService {
  async create(folderId, { name, type, size, description }) {
    const folderExist = await FolderService.findOne({ folderId });
    if (!folderExist) return null;
    const fileExists = await this.findOne({ name });
    if (fileExists) return fileExists;

    const fileCreated = await FileModel.create({
      folderId,
      type,
      size,
      name,
      description,
    });
    return fileCreated?.toJSON();
  }

  async update(folderId, fileId, query) {
    const folderExist = await FolderService.findOne({ folderId });
    if (!folderExist) return null;

    const fileExists = await this.findOne({ fileId });
    if (!fileExists) return null;

    const file = await FileModel.update(query, { where: { fileId } });
    return file == 1;
  }

  async findOne(query) {
    const file = await FileModel.findOne({ where: { ...query } });
    return file?.toJSON();
  }

  async findAll(folderId, query) {
    const folderExist = await FolderService.findOne({ folderId });
    if (!folderExist) return { error: "Folder does not exist" };

    const files = await FileModel.findAll({ where: { ...query } });
    return files?.map((file) => file.toJSON());
  }

  async delete(fileId) {
    const fileExists = await this.findOne({ fileId });
    if (!fileExists) return { error: "File does not exist" };

    const deleted = await FileModel.destroy({ where: { fileId } });
    return deleted == 1 ? true : { error: "File not deleted" };
  }

  async sort(folderId, query, ASC = true) {
    const folderExist = await FolderService.findOne({ folderId });
    if (!folderExist) return { error: "Folder does not exist" };

    const files = await FileModel.findAll({
      order: [[query, ASC ? "ASC" : "DESC"]],
    });
    return files?.map((file) => file.toJSON());
  }

  async findByProperty(query) {
    const folder = await FolderService.findOne(query);
    const files = await FileModel.findAll({
      where: { folderId: folder.folderId },
    });
    return files?.map((file) => file.toJSON());
  }
}

module.exports = new FileService();
