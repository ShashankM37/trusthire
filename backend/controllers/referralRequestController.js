const ReferralRequest = require("../models/ReferralRequest");
const User = require("../models/User");

const sendReferralRequest = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId, message } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver is required",
      });
    }

    if (receiverId === senderId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a referral request to yourself",
      });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    const existingRequest = await ReferralRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "A pending referral request already exists",
      });
    }

    const referralRequest = await ReferralRequest.create({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Referral request sent",
      referralRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyReferralRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const sentRequests = await ReferralRequest.find({
      sender: userId,
    })
      .populate("receiver", "name email role company experience location")
      .sort({ createdAt: -1 });

    const receivedRequests = await ReferralRequest.find({
      receiver: userId,
    })
      .populate("sender", "name email role company experience location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      sentRequests,
      receivedRequests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const respondReferralRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { action } = req.body;

    if (!["accepted", "rejected"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid action",
      });
    }

    const request = await ReferralRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Referral request not found",
      });
    }

    if (request.receiver.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Only the receiver can respond to this request",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Request has already been responded to",
      });
    }

    request.status = action;
    await request.save();

    res.status(200).json({
      success: true,
      message: `Referral request ${action}`,
      referralRequest: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  sendReferralRequest,
  getMyReferralRequests,
  respondReferralRequest,
};
