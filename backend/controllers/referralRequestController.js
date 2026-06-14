const ReferralRequest = require("../models/ReferralRequest");
const User = require("../models/User");

const sendReferralRequest = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId, opportunityId, message } = req.body;

    if (!receiverId || !opportunityId) {
      return res.status(400).json({ success: false, message: "Receiver and opportunity are required" });
    }

    if (receiverId === senderId) {
      return res.status(400).json({ success: false, message: "You cannot send a referral request to yourself" });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ success: false, message: "Receiver not found" });
    }

    // Only verified employees can receive referral requests
    if (!["employee", "recruiter"].includes(receiver.role) || receiver.employeeVerificationStatus !== "verified") {
      return res.status(403).json({ success: false, message: "Receiver is not a verified employee" });
    }

    const opportunity = await require("../models/Opportunity").findById(opportunityId);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: "Opportunity not found" });
    }

    if (opportunity.status === "Closed") {
      return res.status(400).json({ success: false, message: "This opportunity is closed." });
    }

    if (opportunity.referralSlots <= 0) {
      return res.status(400).json({ success: false, message: "No referral slots are available." });
    }

    // Ensure sender has a resume
    const sender = await User.findById(senderId);

    const hasResume = sender?.resume && (sender.resume.url || typeof sender.resume === "string");

    if (!hasResume) {
      return res.status(400).json({ success: false, message: "Please upload a resume before sending a referral request" });
    }

    const existingRequest = await ReferralRequest.findOne({ sender: senderId, receiver: receiverId, opportunity: opportunityId, status: "Pending" });

    if (existingRequest) {
      return res.status(400).json({ success: false, message: "A pending referral request for this opportunity already exists" });
    }

    const referralRequest = await ReferralRequest.create({ sender: senderId, receiver: receiverId, opportunity: opportunityId, message });

    res.status(201).json({ success: true, message: "Referral request sent", referralRequest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
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

    if (!["Accepted", "Rejected"].includes(action)) {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }

    const request = await ReferralRequest.findById(id);

    if (!request) {
      return res.status(404).json({ success: false, message: "Referral request not found" });
    }

    if (request.receiver.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Only the receiver can respond to this request" });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Request has already been responded to" });
    }

    if (action === "Rejected") {
      request.status = "Rejected";
      await request.save();

      return res.status(200).json({ success: true, message: "Referral request rejected", referralRequest: request });
    }

    // Action is Accepted: create Referral, link records, respect slots
    const Opportunity = require("../models/Opportunity");
    const Referral = require("../models/Referral");

    const opportunity = await Opportunity.findById(request.opportunity);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: "Linked opportunity not found" });
    }

    if (opportunity.referralSlots <= 0) {
      return res.status(400).json({ success: false, message: "No referral slots available for this opportunity" });
    }

    // Ensure receiver still verified
    const receiver = await User.findById(request.receiver);
    if (!receiver || receiver.employeeVerificationStatus !== "verified") {
      return res.status(403).json({ success: false, message: "Receiver is no longer a verified employee" });
    }

    // Create Referral record (single source of truth)
    const existingReferral = await Referral.findOne({
      candidate: request.sender,
      employee: request.receiver,
      opportunity: opportunity._id,
    });

    if (existingReferral) {
      // mark request accepted and return existing referral
      request.status = "Accepted";
      await request.save();

      return res.status(200).json({ success: true, message: "Referral request accepted", referral: existingReferral, referralRequest: request });
    }

    const referral = await Referral.create({
      candidate: request.sender,
      employee: request.receiver,
      company: opportunity.company,
      role: opportunity.title,
      message: request.message || "",
      status: "Accepted",
      opportunity: opportunity._id,
    });

    // decrement slots
    opportunity.referralSlots = Math.max(0, opportunity.referralSlots - 1);
    if (opportunity.referralSlots === 0) {
      opportunity.status = "Closed";
    }
    await opportunity.save();

    request.status = "Accepted";
    await request.save();

    const populatedReferral = await Referral.findById(referral._id).populate([
      { path: "candidate", select: "name email role skills location linkedin" },
      { path: "employee", select: "name email role bio skills location" },
    ]);

    res.status(200).json({ success: true, message: "Referral created and request accepted", referral: populatedReferral, referralRequest: request });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  sendReferralRequest,
  getMyReferralRequests,
  respondReferralRequest,
};
