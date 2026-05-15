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

    // UPLOAD TO CLOUDINARY
    const result =
      await cloudinary.uploader.upload(
        req.file.path,
        {
          resource_type: "raw",

          folder:
            "trusthire-resumes",
        }
      );

    // UPDATE USER
    const user =
      await User.findById(userId);

    user.resume = result.secure_url;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Resume uploaded successfully 🚀",
      resume:
        result.secure_url,
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