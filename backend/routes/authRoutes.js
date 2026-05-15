const express = require("express");

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
} = require(
  "../controllers/authController"
);


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