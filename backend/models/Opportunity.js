const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    jobLink: { type: String, default: "" },
    location: { type: String, default: "" },
    requiredSkills: [{ type: String, trim: true }],
    experienceRequirement: { type: String, default: "" },
    referralSlots: { type: Number, default: 1, min: 0 },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    description: { type: String, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
