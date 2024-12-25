const { Router } = require("express");
const UploadFileMiddleware = require("../middlewares/file-upload.middleware");
const fileController = require("../controllers");
const imageResize = require("../middlewares/image-resize.middleware");
const isFilePresent = require("../middlewares/isFile-present.middleware");
const authJWT = require("../middlewares/auth.middleware");

const fileRouter = Router();

fileRouter.post(
  "/upload",
  UploadFileMiddleware.single("file"),
  imageResize,
  fileController
);

module.exports = fileRouter;
