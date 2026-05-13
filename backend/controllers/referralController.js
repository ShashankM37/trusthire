const Referral = require("../models/Referral");

const getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find();

    res.json({
      success: true,
      referrals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createReferral = async (req, res) => {
  try {
    const { company, role, location } = req.body;

    const newReferral = new Referral({
      company,
      role,
      location,
    });

    await newReferral.save();

    res.status(201).json({
      success: true,
      message: "Referral Created",
      referral: newReferral,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getReferrals,
  createReferral,
};