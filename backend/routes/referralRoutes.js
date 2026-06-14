const express = require("express");

const router = express.Router();

const Referral = require("../models/Referral");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const referralPopulate = [
  {
    path: "candidate",
    select:
      "name email role skills location linkedin github leetcode codeforces hackerrank portfolio",
  },
  {
    path: "employee",
    select: "name email role bio skills location",
  },
];

// GET EMPLOYEES AVAILABLE FOR REFERRALS
router.get("/employees", authMiddleware, async (req, res) => {
  try {
    const employees = await User.find({
      role: {
        $in: [
          "employee",
          "recruiter",
        ],
      },
      isVerified: true,
      employeeVerificationStatus:
        "verified",
    }).select(
      "name email role bio skills location company linkedin employeeVerificationStatus"
    );

    res.json({
      success: true,
      employees,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET REFERRALS FOR CURRENT USER
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const query =
      req.role === "employee" || req.role === "recruiter"
        ? { employee: req.userId }
        : { candidate: req.userId };

    const referrals = await Referral.find(query)
      .populate(referralPopulate)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      referrals,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Candidate-facing direct referral creation is deprecated.
// Use POST /api/referral-requests to request a referral tied to an Opportunity.
router.post("/", authMiddleware, (req, res) => {
  return res.status(410).json({
    success: false,
    message:
      "Deprecated: candidate creation via /api/referrals is disabled. Use /api/referral-requests to request a referral linked to an opportunity.",
  });
});

// ACCEPT, REJECT, OR UPDATE REFERRAL STATUS
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Accepted",
      "Rejected",
      "In Progress",
      "Referred",
      "Interview Received",
      "Interview Completed",
      "Offer Received",
      "Hired",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid referral status",
      });
    }

    const referral = await Referral.findById(req.params.id);

    if (!referral) {
      return res.status(404).json({
        success: false,
        message: "Referral not found",
      });
    }

    if (referral.employee.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Only the employee can update this referral",
      });
    }

    // Enforce forward-only state transitions
    const statusOrder = {
      Pending: 0,
      Accepted: 1,
      "In Progress": 2,
      Referred: 3,
      "Interview Received": 4,
      "Interview Completed": 5,
      "Offer Received": 6,
      Hired: 7,
    };

    const currentIndex = statusOrder[referral.status];
    const newIndex = statusOrder[status];

    if (newIndex < currentIndex) {
      return res.status(400).json({
        success: false,
        message: "Cannot revert referral status to a previous stage",
      });
    }

    referral.status = status;

    await referral.save();

    const updatedReferral = await Referral.findById(referral._id).populate(
      referralPopulate
    );

    res.json({
      success: true,
      message: "Referral status updated",
      referral: updatedReferral,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
