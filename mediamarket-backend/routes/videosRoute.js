const express = require("express");
const handleUpload = require("../storage/Cloudinary");
const multer = require("multer");

const router = express.Router();

// Configure multer upload middleware
const storage = multer.memoryStorage();
const upload = multer({
  storage, // Use the memory storage for handling multiple files in memory
});

// ADD MEDIA
router.post("/", upload.array("files"), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      throw new Error("No files were uploaded");
    }

    const filePromises = files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString("base64");

      const dataURI = "data:" + file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);

      return cldRes;
    });
    const results = await Promise.all(filePromises);

    // Extract the URLs from the Cloudinary responses
    const videoURLs = results.map((result) => result.url);

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
