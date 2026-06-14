const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const ReferralRequest = require("../models/ReferralRequest");
const Referral = require("../models/Referral");

// Dashboard Stats
const getDashboardStats =
async (req, res) => {

  try {

    const totalUsers =
      await User.countDocuments();

    const totalJobs =
      await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const totalOpportunities = await Opportunity.countDocuments();

    const totalReferralRequests = await ReferralRequest.countDocuments();

    const totalReferrals = await Referral.countDocuments();

    const interviews = await Referral.countDocuments({
      status: { $in: ["Interview Received", "Interview Completed"] },
    });

    const offers = await Referral.countDocuments({ status: "Offer Received" });

    const hires = await Referral.countDocuments({ status: "Hired" });

    const verifiedEmployees = await User.countDocuments({
      role: { $in: ["employee", "recruiter"] },
      employeeVerificationStatus: "verified",
    });

    const candidates = await User.countDocuments({ role: "candidate" });

    res.json({
      success: true,
      totalUsers,
      totalJobs,
      totalApplications,
      totalOpportunities,
      totalReferralRequests,
      totalReferrals,
      interviews,
      offers,
      hires,
      verifiedEmployees,
      candidates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Users
const getAllUsers =
async (req, res) => {

  try {

    const users =
      await User.find().select(
        "-password"
      );

    res.json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete User
const deleteUser =
async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveJob = async (
  req,
  res
) => {

  try {

    const job =
      await Job.findByIdAndUpdate(
        req.params.id,
        {
          status: "approved",
        },
        {
          new: true,
        }
      );

    res.json({
      success: true,
      message:
        "Job approved successfully",
      job,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const getPendingReferrers =
async (req, res) => {

  try {

    const referrers =
      await User.find({
        role: {
          $in: [
            "employee",
            "recruiter",
          ],
        },
        employeeVerificationStatus:
          "pending",
      })
        .select(
          "name email role company linkedin location employeeVerificationStatus createdAt"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      referrers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateReferrerVerification =
async (req, res) => {

  try {

    const { status } = req.body;

    if (
      ![
        "verified",
        "rejected",
      ].includes(status)
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid verification status",
      });

    }

    const referrer =
      await User.findOneAndUpdate(
        {
          _id: req.params.id,
          role: {
            $in: [
              "employee",
              "recruiter",
            ],
          },
        },
        {
          employeeVerificationStatus:
            status,
        },
        {
          new: true,
        }
      ).select(
        "name email role company linkedin location employeeVerificationStatus"
      );

    if (!referrer) {

      return res.status(404).json({
        success: false,
        message: "Referrer not found",
      });

    }

    res.json({
      success: true,
      message:
        status === "verified"
          ? "Referrer approved successfully"
          : "Referrer rejected",
      referrer,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllJobs,
  approveJob,
  getPendingReferrers,
  updateReferrerVerification,
};
