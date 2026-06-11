const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: String,
      default: "",
    },

    jobType: {
      type: String,
      enum: [
        "Full-Time",
        "Part-Time",
        "Internship",
        "Remote",
      ],
      default: "Full-Time",
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: Array,
      default: [],
    },

    skills: {
      type: Array,
      default: [],
    },

    status: {
  type: String,
  enum: [
    "pending",
    "approved",
    "rejected",
  ],
  default: "pending",
},

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Job",
  jobSchema
);