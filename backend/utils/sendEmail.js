const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  family: 4, // FIXES Render IPv6 issue
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

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