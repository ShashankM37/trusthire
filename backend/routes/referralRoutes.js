const express = require("express");

const router = express.Router();

const Referral = require("../models/Referral");


// GET REFERRALS
router.get("/", async (req, res) => {
  try {

    const referrals = await Referral.find();

    res.json({
      success: true,
      referrals,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
});


// ADD REFERRAL
router.post("/", async (req, res) => {
  try {

    const { company, role, location } = req.body;

    const newReferral = new Referral({
      company,
      role,
      location,
    });

    await newReferral.save();

    res.json({
      success: true,
      message: "Referral Added",
      referral: newReferral,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
});


// DELETE REFERRAL
router.delete("/:id", async (req, res) => {
  try {

    await Referral.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Referral Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
});


module.exports = router;