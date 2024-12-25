const { Router } = require("express");
const folderController = require("../controllers/folder.controller");
const fileController = require("../controllers/file.controller");
const upload = require("../utils/file-upload");
const validator = require("../utils/validator");
const router = Router();

router.post(
  "/folders/create",
  validator(
    [
      ["name", "string"],
      ["type", "string"],
      ["maxFileLimit", "number"],
    ],
    "body"
  ),
  folderController.create
);
router.put(
  "/folders/:folderId",
  validator([["folderId", "string", 36]], "params"),
  folderController.update
);
router.delete(
  "/folders/:folderId",
  validator([["folderId", "string", 36]], "params"),
  folderController.delete
);
router.get("/folders", folderController.findAll);

router.post(
  "/folders/:folderId/files",
  validator([["folderId", "string", 36]], "params"),
  upload.single("file"),
  validator(
    [
      ["name", "string"],
      ["description", "string"],
    ],
    "body"
  ),
  fileController.upload
);
router.put(
  "/folders/:folderId/files/:fileId",
  validator(
    [
      ["folderId", "string", 36],
      ["fileId", "string", 36],
    ],
    "params"
  ),
  fileController.update
);
router.delete(
  "/folders/:folderId/files/:fileId",
  validator(
    [
      ["folderId", "string", 36],
      ["fileId", "string", 36],
    ],
    "params"
  ),
  fileController.delete
);
router.get(
  "/folders/:folderId/files/",
  validator([["folderId", "string", 36]], "params"),
  fileController.findAll
);
router.get(
  "/folders/:folderId/filesBySort",
  validator([["folderId", "string", 36]], "params"),
  validator([["sort", "string"]], "query"),
  fileController.sort
);
router.get(
  "/files/",
  validator([["type", "string"]], "query"),
  fileController.findByProperty
);

module.exports = router;
