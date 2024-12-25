const { Router } = require("express");
const {
  searchPhotos,
  savePhoto,
  saveTags,
  searchPhotosByTag,
} = require("../controllers/photo.controller");
const { getSearchHistory } = require("../controllers/history.controller");
const validator = require("../utils/validate-input");

const photoRouter = Router();

photoRouter.post(
  "/photos",
  validator([
    ["imageUrl", "string"],
    ["userId", "string"],
    ["description", "string"],
    ["altDescription", "string"],
    ["tags", "object"],
  ]),
  savePhoto
);
photoRouter.post(
  "/photos/:photoId/tags",
  validator([["photoId", "string"]], "params"),
  validator([["tags", "object"]]),
  saveTags
);
photoRouter.get(
  "/photos/search",
  validator([["query", "string"]], "query"),
  searchPhotos
);
photoRouter.get(
  "/photos/tag/search",
  validator(
    [
      ["tag", "string"],
      ["userId", "string"],
    ],
    "query"
  ),
  searchPhotosByTag
);
photoRouter.get(
  "/search-history",
  validator([["userId", "string"]], "query"),
  getSearchHistory
);

module.exports = photoRouter;
