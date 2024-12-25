const multer = require("multer");
const path = require("path");
const fileTypeValidator = require("../utils/file-type-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension; // Concatenate the timestamp with the extension
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const isFileTypeAllowed = fileTypeValidator(file);
    if (isFileTypeAllowed) {
      cb(null, true);
    } else {
      cb(null, new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
    }
  },
});

module.exports = upload;
