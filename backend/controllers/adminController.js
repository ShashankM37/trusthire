const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

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

    res.json({
      success: true,
      totalUsers,
      totalJobs,
      totalApplications,
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

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllJobs,
  approveJob,
};