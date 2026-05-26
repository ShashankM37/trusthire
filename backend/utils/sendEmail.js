const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 2525,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"TrustHire" <mshashank827@gmail.com>',
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ EMAIL SENT SUCCESSFULLY");
  } catch (error) {
    console.log("❌ FULL EMAIL ERROR:", error);
  }
};

module.exports = sendEmail;