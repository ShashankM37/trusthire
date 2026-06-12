const express = require("express");

const router = express.Router();

const Referral = require("../models/Referral");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const referralPopulate = [
  {
    path: "candidate",
    select: "name email role skills location",
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
      role: "recruiter",
      isVerified: true,
    }).select("name email role bio skills location");

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

// SEND REFERRAL REQUEST
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { employeeId, company, role, message } = req.body;

    if (!employeeId || !company || !role) {
      return res.status(400).json({
        success: false,
        message: "Employee, company, and role are required",
      });
    }

    const employee = await User.findById(employeeId);

    if (
      !employee ||
      !["employee", "recruiter"].includes(employee.role)
    ) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const existingReferral = await Referral.findOne({
      candidate: req.userId,
      employee: employeeId,
      company,
      role,
      status: {
        $in: ["Pending", "Accepted", "In Progress"],
      },
    });

    if (existingReferral) {
      return res.status(400).json({
        success: false,
        message: "Referral request already exists",
      });
    }

    const referral = await Referral.create({
      candidate: req.userId,
      employee: employeeId,
      company,
      role,
      message,
    });

    const populatedReferral = await Referral.findById(referral._id).populate(
      referralPopulate
    );

    res.status(201).json({
      success: true,
      message: "Referral request sent",
      referral: populatedReferral,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
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
