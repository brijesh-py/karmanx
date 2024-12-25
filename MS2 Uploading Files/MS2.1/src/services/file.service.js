const uploadToCloudinary = require("../config/cloudinary.config");
const fs = require("fs");

const cloudinaryUpload = async (file) => {
  try {
    const response = await uploadToCloudinary(file);
    fs.unlinkSync(file.path, () => {
      if (err) {
        console.error(err);
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = cloudinaryUpload;
