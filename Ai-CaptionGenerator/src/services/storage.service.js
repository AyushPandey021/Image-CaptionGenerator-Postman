require("dotenv").config();
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(file, fileName) {
  try {
    const result = await imagekit.upload({
      file: file, 
      fileName: fileName,
      folder: "images", 
    });
    return result; 
  } catch (error) {
    console.error("Image upload failed:", error.message);
    throw error;
  }
}

module.exports = uploadImage;
