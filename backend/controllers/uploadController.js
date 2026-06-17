const cloudinary = require(
  "../config/cloudinary"
);

const User = require(
  "../models/User"
);


// =========================
// UPLOAD RESUME
// =========================
const uploadResume = async (
  req,
  res
) => {

  try {

    const userId = req.userId;

    // CHECK FILE
    if (!req.file) {

      return res.status(400).json({
        success: false,
        message:
          "No file uploaded",
      });

    }


    // UPDATE USER
const user = await User.findById(userId);

user.resume = {
  url: req.file.path,
  public_id: req.file.filename,
};

await user.save();

res.status(200).json({
  success: true,
  message: "Resume uploaded successfully 🚀",
  resume: req.file.path,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });

  }

};


module.exports = {
  uploadResume,
};