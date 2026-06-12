const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllJobs,
  approveJob,
  getPendingReferrers,
  updateReferrerVerification,
} = require(
  "../controllers/adminController"
);

// Dashboard
router.get(
  "/dashboard",
  getDashboardStats
);

router.get(
  "/jobs",
  authMiddleware,
  adminMiddleware,
  getAllJobs
)

router.get(
  "/test-approve/:id",
  approveJob
);

router.put(
  "/jobs/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveJob
);

router.get(
  "/referrers/pending",
  authMiddleware,
  adminMiddleware,
  getPendingReferrers
);

router.put(
  "/referrers/:id/verification",
  authMiddleware,
  adminMiddleware,
  updateReferrerVerification
);

// Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers,
);

// Delete User
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;
