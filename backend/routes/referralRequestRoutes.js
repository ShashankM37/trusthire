const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  sendReferralRequest,
  getMyReferralRequests,
  respondReferralRequest,
} = require("../controllers/referralRequestController");

router.post(
  "/",
  authMiddleware,
  sendReferralRequest
);

router.get(
  "/my-requests",
  authMiddleware,
  getMyReferralRequests
);

router.put(
  "/:id/respond",
  authMiddleware,
  respondReferralRequest
);

module.exports = router;
