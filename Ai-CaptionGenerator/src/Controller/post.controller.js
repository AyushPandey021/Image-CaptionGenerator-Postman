const generateCaption = require("../services/ai.service");
const uploadImage = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");
const postModel = require("../models/post.model");

async function postController(req, res) {
  const file = req.file;
  const base64ImageFile = file.buffer.toString("base64");
  const caption = await generateCaption(base64ImageFile);
  const result = await uploadImage(file.buffer, uuidv4());
  const post = await postModel.create({
    caption: caption,
    imageUrl: result.url,
  });
  res.json({
    message: "Post created successfully",
    post,
  });
}
module.exports = postController;
