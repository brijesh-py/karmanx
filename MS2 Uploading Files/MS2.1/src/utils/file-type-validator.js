const path = require("path");

const fileTypeValidator = (file) => {
  const allowedFileTypes = [".jpg", ".jpeg", ".png", ".gif"];
  const fileExtension = path.extname(file.originalname)?.toLocaleLowerCase();
  return allowedFileTypes.includes(fileExtension);
};

module.exports = fileTypeValidator;
