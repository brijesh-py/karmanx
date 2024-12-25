const UnsplashService = require("../services/unsplash.service");
const PhotoService = require("../services/photo.service");
const TagService = require("../services/tag.service");
const SearchHistoryService = require("../services/history.service");
const { HttpError, errorHandler } = require("../utils/error-handler");

const searchPhotos = (req, res) => {
  const { query } = req.query;
  errorHandler(res, async () => {
    const photos = await UnsplashService.search(query);
    if (!photos || photos?.length == 0) {
      throw new HttpError({
        res,
        message: `Photos not found on query: ${query}`,
      });
    }
    res.status(200).json({
      status: 200,
      message: "Photos found successfully",
      photos,
    });
  });
};

const savePhoto = (req, res) => {
  const { imageUrl, description, altDescription, tags, userId } = req.body;
  const data = { imageUrl, description, altDescription, tags, userId };
  errorHandler(res, async () => {
    const photo = await PhotoService.save(data);
    const tag = await TagService.save(photo.id, tags);
    photo.tags = JSON.parse(tag?.name);

    if (!photo) {
      throw new HttpError({ res, message: "Failed to save Photo" });
    }
    res.status(201).json({
      status: 201,
      message: "Photo saved successfully",
      photo,
    });
  });
};

const saveTags = (req, res) => {
  const photoId = req.params.photoId;
  const { tags } = req.body;
  errorHandler(res, async () => {
    const tag = await TagService.save(photoId, tags);
    if (!tag) {
      throw new HttpError({ res, message: "Invalid photoId" });
    }
    res.status(201).json({
      status: 201,
      message: "Tags saved successfully",
      tag,
    });
  });
};

const searchPhotosByTag = (req, res) => {
  const { tag, userId } = req.query;
  errorHandler(res, async () => {
    const photos = await PhotoService.findByTag(tag);
    await SearchHistoryService.save(userId, tag);

    if (!photos || photos?.length == 0) {
      throw new HttpError({
        res,
        message: `Photos not found on tag: ${tag}`,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Photos found successfully",
      photos,
    });
  });
};

module.exports = { searchPhotos, savePhoto, saveTags, searchPhotosByTag };
