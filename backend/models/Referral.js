const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Rejected",
        "In Progress",
        "Referred",
        "Interview Received",
        "Interview Completed",
        "Offer Received",
        "Hired",
      ],
      default: "Pending",
    },
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique referral per candidate + employee + opportunity
// Use sparse index so legacy referrals without opportunity are unaffected
referralSchema.index({ candidate: 1, employee: 1, opportunity: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Referral", referralSchema);
