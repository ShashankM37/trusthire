const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"TrustHire" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("✅ EMAIL SENT SUCCESSFULLY");
  } catch (error) {
    console.log("❌ FULL EMAIL ERROR:", error);
  }
};

module.exports = sendEmail;