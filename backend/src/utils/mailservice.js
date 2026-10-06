import crypto from "crypto";
import nodemailer from "nodemailer";

// logging into app email account
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//generate token for password reset
export const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  return { token, hashedToken, expires };
};

//send the email with reset link
export const sendResetEmail = async (email, token) => {
  const mailOptions = {
    from: `Lad FileUploader <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",
    text: `Click here to reset your password: ${process.env.RESET_URL}/${token}
    
    This link will expire in 1 hour.
    Do not share this link with anyone.
    If you did not request a password reset, please ignore this email.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Failed to send reset email", { cause: err });
  }
};