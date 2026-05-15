const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  uploadResume,
} = require(
  "../controllers/uploadController"
);

// UPLOAD RESUME
router.post(
  "/resume",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

module.exports = router;