const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  // Send email in background
  setImmediate(async () => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("OTP sent successfully");
    } catch (error) {
      console.log("Email Error:", error);
    }
  });
};

module.exports = sendEmail;