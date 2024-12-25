require("dotenv").config();
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const generateSignature = (paramToSign) => {
  const { api_secret } = cloudinary.config();
  const sortedParams = Object.keys(paramToSign)
    .sort()
    .map((key) => `${key}=${paramToSign[key]}`)
    .join("&");
  const signatureCrypto = crypto
    .createHash("sha1")
    .update(sortedParams + api_secret)
    .digest("hex");
  return signatureCrypto;
};

const uploadToCloudinary = async (file) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramToSign = {
    timestamp,
  };

  const response = await cloudinary.uploader.upload(file.path, {
    ...paramToSign,
    signatureCrypto: generateSignature(paramToSign),
    api_key: cloudinary.config().api_key,
  });
  return response;
};

module.exports = uploadToCloudinary;