const TagModel = require("../../models/tag");
const { Op } = require("sequelize");
const PhotoModel = require("../../models/photo");

class TagService {
  async save(photoId, tags) {
    const tag = await TagModel.create({ photoId, name: JSON.stringify(tags) });
    return tag?.toJSON();
  }

  async findOne(name) {
    const tag = await TagModel.findAll({
      include: {
        model: PhotoModel,
        attributes: ["imageUrl"],
      },
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return tag;
  }
}

module.exports = new TagService();
