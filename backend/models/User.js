const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFO
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "candidate",
        "recruiter",
        "admin",
      ],
      default: "candidate",
    },

    // =========================
    // PROFILE INFO
    // =========================
    bio: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    skills: {
      type: Array,
      default: [],
    },

    // =========================
    // SOCIAL LINKS
    // =========================
    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    // =========================
    // FILES
    // =========================
    resume: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    // =========================
    // EMAIL VERIFICATION
    // =========================
    isVerified: {
      type: Boolean,
      default: false,
    },

    // =========================
    // REGISTER OTP
    // =========================
    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    // =========================
    // RESET PASSWORD OTP
    // =========================
    resetOTP: {
      type: String,
      default: null,
    },

    resetOTPExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);