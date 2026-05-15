const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const generateOTP = require("../utils/generateOTP");

const sendEmail = require("../utils/sendEmail");


// =========================
// REGISTER USER
// =========================
const registerUser = async (req, res) => {

  try {

    const { name, email, password } =
      req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // GENERATE OTP
    const otp = generateOTP();

    // OTP EXPIRY
    const otpExpiry =
      Date.now() + 5 * 60 * 1000;

    // CREATE USER
    await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    // SEND EMAIL
    await sendEmail(
      email,
      "TrustHire Email Verification",
      `Your OTP is: ${otp}`
    );

    res.status(201).json({
      success: true,
      message:
        "OTP sent to your email 🚀",
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
// VERIFY OTP
// =========================
const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    // FIND USER
    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // CHECK OTP
    if (user.otp !== otp) {

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    }

    // CHECK OTP EXPIRY
    if (user.otpExpiry < Date.now()) {

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });

    }

    // VERIFY USER
    user.isVerified = true;

    // CLEAR OTP
    user.otp = null;

    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Email verified successfully 🚀",
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
// LOGIN USER
// =========================
const loginUser = async (req, res) => {

  try {

    const { email, password } =
      req.body;

    // FIND USER
    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    }

    // CHECK VERIFIED
    if (!user.isVerified) {

      return res.status(401).json({
        success: false,
        message:
          "Please verify your email first",
      });

    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });

    }

    // JWT TOKEN
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Login Successful 🚀",
      token,
      user,
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
// FORGOT PASSWORD
// =========================
const forgotPassword = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    // FIND USER
    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // GENERATE RESET OTP
    const resetOTP = generateOTP();

    // OTP EXPIRY
    const resetOTPExpiry =
      Date.now() + 5 * 60 * 1000;

    // SAVE OTP
    user.resetOTP = resetOTP;

    user.resetOTPExpiry =
      resetOTPExpiry;

    await user.save();

    // SEND EMAIL
    await sendEmail(
      email,
      "TrustHire Password Reset",
      `Your password reset OTP is: ${resetOTP}`
    );

    res.status(200).json({
      success: true,
      message:
        "Password reset OTP sent 🚀",
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
// RESET PASSWORD
// =========================
const resetPassword = async (
  req,
  res
) => {

  try {

    const {
      email,
      otp,
      newPassword,
    } = req.body;

    // FIND USER
    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // CHECK OTP
    if (user.resetOTP !== otp) {

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    }

    // CHECK OTP EXPIRY
    if (
      user.resetOTPExpiry <
      Date.now()
    ) {

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });

    }

    // HASH NEW PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    // UPDATE PASSWORD
    user.password = hashedPassword;

    // CLEAR RESET OTP
    user.resetOTP = null;

    user.resetOTPExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successful 🚀",
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
// UPDATE PROFILE
// =========================
const updateProfile = async (
  req,
  res
) => {

  try {

    const userId = req.userId;

    const {
      name,
      bio,
      experience,
      education,
      location,
      skills,
      linkedin,
      github,
      portfolio,
      resume,
      profileImage,
    } = req.body;

    // FIND USER
    const user =
      await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    // UPDATE FIELDS
    user.name =
      name || user.name;

    user.bio =
      bio || user.bio;

    user.experience =
      experience ||
      user.experience;

    user.education =
      education ||
      user.education;

    user.location =
      location ||
      user.location;

    user.skills =
      skills || user.skills;

    user.linkedin =
      linkedin ||
      user.linkedin;

    user.github =
      github || user.github;

    user.portfolio =
      portfolio ||
      user.portfolio;

    user.resume =
      resume || user.resume;

    user.profileImage =
      profileImage ||
      user.profileImage;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully 🚀",
      user,
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
  registerUser,
  verifyOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  updateProfile,
};