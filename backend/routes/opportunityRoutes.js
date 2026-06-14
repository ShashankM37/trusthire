const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  getMyOpportunities,
  updateOpportunity,
  closeOpportunity,
} = require("../controllers/opportunityController");

router.get("/", getOpportunities);
router.get("/mine", authMiddleware, getMyOpportunities);
router.get("/:id", getOpportunityById);
router.post("/", authMiddleware, createOpportunity);
router.put("/:id", authMiddleware, updateOpportunity);
router.post("/:id/close", authMiddleware, closeOpportunity);

module.exports = router;
