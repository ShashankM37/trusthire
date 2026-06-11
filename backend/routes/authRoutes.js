const express = require("express");

const rateLimit = require("express-rate-limit");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  registerUser,
  verifyOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  updateProfile,
} = require("../controllers/authController");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


// =========================
// REGISTER
// =========================
router.post(
  "/register",
  registerUser
);


// =========================
// VERIFY OTP
// =========================
router.post(
  "/verify-otp",
  verifyOTP
);


// =========================
// LOGIN
// =========================
router.post(
  "/login",
  loginLimiter,
  loginUser
);


// =========================
// FORGOT PASSWORD
// =========================
router.post(
  "/forgot-password",
  forgotPassword
);


// =========================
// RESET PASSWORD
// =========================
router.post(
  "/reset-password",
  resetPassword
);


// =========================
// PROTECTED ROUTE
// =========================
router.get(
  "/protected",
  authMiddleware,
  (req, res) => {

    res.json({
      success: true,
      message:
        "Protected route accessed 🚀",
      userId: req.userId,
    });

  }
);

router.put(
  "/update-profile",
  authMiddleware,
  updateProfile
)


module.exports = router;