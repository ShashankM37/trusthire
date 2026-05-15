const Application = require(
  "../models/Application"
);

const Job = require(
  "../models/Job"
);


// =========================
// APPLY TO JOB
// =========================
const applyToJob = async (
  req,
  res
) => {

  try {

    const userId = req.userId;

    const { jobId } = req.body;

    // CHECK JOB
    const job =
      await Job.findById(jobId);

    if (!job) {

      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }

    // CHECK EXISTING APPLICATION
    const alreadyApplied =
      await Application.findOne({
        applicant: userId,
        job: jobId,
      });

    if (alreadyApplied) {

      return res.status(400).json({
        success: false,
        message:
          "Already applied to this job",
      });

    }

    // CREATE APPLICATION
    const application =
      await Application.create({
        applicant: userId,
        job: jobId,
      });

    // ADD APPLICANT TO JOB
    job.applicants.push(userId);

    await job.save();

    res.status(201).json({
      success: true,
      message:
        "Applied successfully 🚀",
      application,
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
// GET MY APPLICATIONS
// =========================
const getMyApplications =
  async (req, res) => {

    try {

      const userId = req.userId;

      const applications =
        await Application.find({
          applicant: userId,
        })
          .populate("job")
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        applications,
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
  applyToJob,
  getMyApplications,
};