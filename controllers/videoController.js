const Video = require("../models/Video");
const Payment = require("../models/Payment");


/**
 * =========================
 * ADMIN API (NO USER ID)
 * =========================
 * Full video list (all types)
 */
exports.getAdminVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      role: "admin",
      count: videos.length,
      data: videos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * =========================
 * CUSTOMER API (WITH USER ID)
 * =========================
 * Only free + paid videos
 */
exports.getUserVideos = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id required",
      });
    }

    // 🔥 check payment
    const paidUser = await Payment.findOne({
      user_id,
      status: "success",
    });

    const videos = await Video.find().sort({ createdAt: -1 });

    const result = {
      free: [],
      paid: [],
    };

    videos.forEach((video) => {
      if (video.type === "free") {
        result.free.push(video.videoUrl);
      } else {
        result.paid.push(video.videoUrl);
      }
    });

    // 🔥 FINAL RULE
    if (!paidUser) {
      // only free videos
      return res.status(200).json({
        success: true,
        role: "customer",
        user_id,
        type: [
          {
            name: "Free Videos",
            count: result.free.length,
            videos: result.free,
          },
        ],
      });
    }

    // paid user → full access
    return res.status(200).json({
      success: true,
      role: "customer",
      user_id,
      type: [
        {
          name: "Free Videos",
          count: result.free.length,
          videos: result.free,
        },
        {
          name: "Paid Videos",
          count: result.paid.length,
          videos: result.paid,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * =========================
 * ADD VIDEO (ADMIN USE)
 * =========================
 */
exports.addVideo = async (req, res) => {
  try {
    const { videoUrl, stage, type } = req.body;

    if (!videoUrl || stage === undefined || !type) {
      return res.status(400).json({
        success: false,
        message: "videoUrl, stage and type are required",
      });
    }

    const video = await Video.create({ videoUrl, stage, type });

    return res.status(201).json({
      success: true,
      data: video,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};