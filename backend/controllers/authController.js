const User = require("../models/User");

const jwt = require("jsonwebtoken");

const generateOTP = require("../utils/generateOTP");

const sendEmail = require("../utils/sendEmail");


// =========================
// GENERATE JWT TOKEN
// =========================
const generateToken = (id) => {

  return jwt.sign(
    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }
  );
};


// =========================
// REGISTER USER
// =========================
const registerUser = async (req, res) => {

  try {

    const { name, email, password } =
      req.body;

    // VALIDATION
    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // GENERATE OTP
    const otp = generateOTP();

    // OTP EXPIRY
    const otpExpiry =
      Date.now() + 5 * 60 * 1000;

    // CREATE USER
    await User.create({
      name,
      email,
      password,
      otp,
      otpExpiry,
      isVerified: false,
    });

    // SEND RESPONSE INSTANTLY
    res.status(201).json({
      success: true,
      message:
        "OTP sent to your email 🚀",
    });

    // SEND EMAIL IN BACKGROUND
    sendEmail(
      email,
      "TrustHire Email Verification",
      `Your OTP is: ${otp}`
    );

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

    // FIND USER + PASSWORD
    const user = await User.findOne({
      email,
    }).select("+password");

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
      await user.comparePassword(
        password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // GENERATE TOKEN
    const token =
      generateToken(user._id);

    // REMOVE PASSWORD
    user.password = undefined;

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

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // GENERATE OTP
    const resetOTP =
      generateOTP();

    // EXPIRY
    const resetOTPExpiry =
      Date.now() + 5 * 60 * 1000;

    // SAVE
    user.resetOTP = resetOTP;

    user.resetOTPExpiry =
      resetOTPExpiry;

    await user.save();

    // SEND RESPONSE FIRST
    res.status(200).json({
      success: true,
      message:
        "Password reset OTP sent 🚀",
    });

    // SEND EMAIL IN BACKGROUND
    sendEmail(
      email,
      "TrustHire Password Reset",
      `Your password reset OTP is: ${resetOTP}`
    );

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

    const user = await User.findOne({
      email,
    }).select("+password");

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

    // CHECK EXPIRY
    if (
      user.resetOTPExpiry <
      Date.now()
    ) {

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // UPDATE PASSWORD
    user.password = newPassword;

    // CLEAR OTP
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

    const user =
      await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // UPDATE ONLY PROVIDED FIELDS
    Object.keys(req.body).forEach(
      (key) => {

        user[key] = req.body[key];
      }
    );

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