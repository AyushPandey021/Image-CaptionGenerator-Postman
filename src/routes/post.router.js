const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const authMiddleware = require("../middleware/auth.middleware");
const postController = require("../Controller/post.controller");

// router.post("/", authMiddleware, upload.single("file"), postController);router.post("/", authMiddleware, upload.single("image"), postController);

router.post("/", authMiddleware, upload.single("image"), postController);


module.exports = router;
