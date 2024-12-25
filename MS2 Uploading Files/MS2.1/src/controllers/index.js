const cloudinaryUpload = require("../services/file.service");

const fileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "No file uploaded",
      });
    }

    const response = await cloudinaryUpload(req.file);

    console.log("CI", response);

    return res.status(200).json({
      status: 200,
      message: "File uploaded successfully",
      data: {
        secure_url: response.secure_url,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Error uploading file",
    });
  }
};

module.exports = fileController;
