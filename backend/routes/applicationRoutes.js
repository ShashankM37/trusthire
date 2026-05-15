const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  applyToJob,
  getMyApplications,
} = require(
  "../controllers/applicationController"
);


// =========================
// APPLY TO JOB
// =========================
router.post(
  "/apply",
  authMiddleware,
  applyToJob
);


// =========================
// MY APPLICATIONS
// =========================
router.get(
  "/my-applications",
  authMiddleware,
  getMyApplications
);


module.exports = router;