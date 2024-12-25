const isFilePresent = (req, res, next) => {
  // if (!req.file) {
  //   return res.status(400).json({
  //     status: 400,
  //     message: "No file uploaded",
  //   });
  // }
  next();
};

module.exports = isFilePresent;
