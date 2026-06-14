const Opportunity = require("../models/Opportunity");
const User = require("../models/User");

// List open opportunities
const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ status: "Open" })
      .populate("createdBy", "name email company role")
      .sort({ createdAt: -1 });

    res.json({ success: true, opportunities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate(
      "createdBy",
      "name email company role"
    );

    if (!opportunity) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, opportunity });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create opportunity (only verified employees/recruiters)
const createOpportunity = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !["employee", "recruiter"].includes(user.role)) {
      return res.status(403).json({ success: false, message: "Only employees can create opportunities" });
    }

    if (user.employeeVerificationStatus !== "verified") {
      return res.status(403).json({ success: false, message: "Employee not verified" });
    }

    const {
      company,
      title,
      jobLink,
      location,
      requiredSkills,
      experienceRequirement,
      referralSlots,
      description,
    } = req.body;

    if (!company || !title) {
      return res.status(400).json({ success: false, message: "Company and title are required" });
    }

    const slots = referralSlots ? Number(referralSlots) : 1;
    if (slots < 1) {
      return res.status(400).json({ success: false, message: "Referral slots must be at least 1" });
    }

    const opportunity = await Opportunity.create({
      company,
      title,
      jobLink,
      location,
      requiredSkills: requiredSkills || [],
      experienceRequirement: experienceRequirement || "",
      referralSlots: slots,
      description: description || "",
      createdBy: req.userId,
    });

    res.status(201).json({ success: true, opportunity });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getMyOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ createdBy: req.userId }).sort({ createdAt: -1 });

    res.json({ success: true, opportunities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (opportunity.createdBy.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Validate referralSlots if being updated
    if (req.body.referralSlots !== undefined) {
      const newSlots = Number(req.body.referralSlots);
      if (newSlots < 1) {
        return res.status(400).json({ success: false, message: "Referral slots must be at least 1" });
      }
    }

    Object.assign(opportunity, req.body);

    await opportunity.save();

    res.json({ success: true, opportunity });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const closeOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (opportunity.createdBy.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    opportunity.status = "Closed";
    await opportunity.save();

    res.json({ success: true, opportunity });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  getMyOpportunities,
  updateOpportunity,
  closeOpportunity,
};
