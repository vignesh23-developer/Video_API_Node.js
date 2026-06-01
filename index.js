console.log("🔥 index.js started successfully");

const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

// DB + Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at https://localhost:${PORT}`);
  });
});
