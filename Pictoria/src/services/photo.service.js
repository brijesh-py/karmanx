const PhotoModel = require("../../models/photo");
const TagService = require("./tag.service");

class PhotoService {
  constructor() {}
  async save(data) {
    const photo = await PhotoModel.create(data);
    return photo.toJSON();
  }

  async findOne(query) {
    const photo = await PhotoModel.findOne({ where: { ...query } });
    return photo;
  }

  async findByTag(tag, isAcs = true) {
    const existingTag = await TagService.findOne(tag);
    if (!existingTag || existingTag.length == 0) return null;

    const photos = [];
    for (const tag of existingTag) {
      const photo = await PhotoModel.findOne({
        where: { id: tag.photoId },
        order: [["createdAt", isAcs ? "ASC" : "DESC"]],
      });
      const photoInJson = photo.toJSON();
      photoInJson.tags = JSON.parse(tag.name)
      photos.push(photoInJson);
    }

    return photos;
  }
}

module.exports = new PhotoService();
