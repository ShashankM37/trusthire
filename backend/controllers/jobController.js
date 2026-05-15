const Job = require("../models/Job");


// =========================
// CREATE JOB
// =========================
const createJob = async (
  req,
  res
) => {

  try {

    const {
      title,
      company,
      location,
      salary,
      jobType,
      description,
      requirements,
      skills,
    } = req.body;

    // CREATE JOB
    const job = await Job.create({
      title,
      company,
      location,
      salary,
      jobType,
      description,
      requirements,
      skills,
      postedBy: req.userId,
    });

    res.status(201).json({
      success: true,
      message:
        "Job posted successfully 🚀",
      job,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


// =========================
// GET ALL JOBS
// =========================
const getAllJobs = async (
  req,
  res
) => {

  try {

    const jobs = await Job.find()
      .populate(
        "postedBy",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


// =========================
// GET SINGLE JOB
// =========================
const getSingleJob = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const job =
      await Job.findById(id)
        .populate(
          "postedBy",
          "name email"
        );

    if (!job) {

      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }

    res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
};