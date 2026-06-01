const express = require("express");
const router = express.Router();

const {
  addVideo,
  getAllVideos,
  getByStage,
  getVideoStructured
} = require("../controllers/videoController");

// add video
router.post("/", addVideo);

// normal get
router.get("/", getAllVideos);

// get by stage param
router.get("/stage/:stage", getByStage);

// ⭐ MAIN API (your flutter will call this)
router.post("/structured", getVideoStructured);

module.exports = router;

