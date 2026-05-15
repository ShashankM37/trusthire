const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createJob,
  getAllJobs,
  getSingleJob,
} = require(
  "../controllers/jobController"
);


// =========================
// CREATE JOB
// =========================
router.post(
  "/create",
  authMiddleware,
  createJob
);


// =========================
// GET ALL JOBS
// =========================
router.get(
  "/all",
  getAllJobs
);


// =========================
// GET SINGLE JOB
// =========================
router.get(
  "/:id",
  getSingleJob
);


module.exports = router;