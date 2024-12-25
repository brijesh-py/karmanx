const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imageResize = async (req, res, next) => {
  try {
    const originalFilePath = req.file.path;
    const parsedPath = path.parse(originalFilePath);
    const outputFilePath = path.join(
      parsedPath.dir,
      "resized-" + parsedPath.name + ".jpeg"
    );
    await sharp(originalFilePath)
      .resize({
        width: 1500,
      })
      .jpeg({
        quality: 100,
        mozjpeg: true,
        chromaSubsampling: "4:4:4",
        trellisQuantisation: true,
        overshootDeringing: true,
        optimiseScans: true,
        progressive: true,
      })
      .toFile(outputFilePath);
    req.file.path = outputFilePath;
    req.originalFilePath = originalFilePath;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Error resizing image",
    });
  }
};

module.exports = imageResize;
