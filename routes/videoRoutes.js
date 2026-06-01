const express = require("express");
const router = express.Router();

const videoController = require("../controllers/videoController");

// ADMIN
router.get("/admin/videos", videoController.getAdminVideos);

// CUSTOMER
router.post("/user/videos", videoController.getUserVideos);

// ADD VIDEO
router.post("/add", videoController.addVideo);

module.exports = router;