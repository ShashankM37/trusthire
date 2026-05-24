const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// =========================
// USER SCHEMA
// =========================
const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFO
    // =========================
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,

      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,

      // hide password in queries
      select: false,
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
      maxlength: 500,
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    education: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

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
      url: {
        type: String,
        default: "",
      },

      public_id: {
        type: String,
        default: "",
      },
    },

    profileImage: {
      url: {
        type: String,
        default: "",
      },

      public_id: {
        type: String,
        default: "",
      },
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

// =========================
// HASH PASSWORD BEFORE SAVE
// =========================
userSchema.pre(
  "save",

  async function () {

    // skip if password not modified
    if (!this.isModified("password")) {
      return;
    }

    // generate salt
    const salt = await bcrypt.genSalt(10);

    // hash password
    this.password = await bcrypt.hash(
      this.password,
      salt
    );
  }
);

// =========================
// COMPARE PASSWORD
// =========================
userSchema.methods.comparePassword =
async function (enteredPassword) {

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

// =========================
// EXPORT MODEL
// =========================
const User = mongoose.model(
  "User",
  userSchema
);

module.exports = User;