// storage/Cloudinary.js

const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "popit",
  api_key: "858482923566979",
  api_secret: "G5_Qn4xEa46zX1TyNTk6GsyTr5k",
  secure: true,
});

const handleUpload = async (dataURI) => {
  try {
    const res = await cloudinary.uploader.upload(dataURI, {
      folder: "market-media", // Specify the desired folder name
      resource_type: "auto",
    });
    return res;
  } catch (error) {
    throw new Error("Failed to upload file to Cloudinary");
  }
};

module.exports = handleUpload;
