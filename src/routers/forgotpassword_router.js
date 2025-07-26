import express from "express";
import { sendotp } from "../utils/sendotp.js";
import { User } from "../models/user.models.js";
const forgotpassword_router = express.Router();
forgotpassword_router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
       req.session.toast = "The email is not registered. Please register first.";
      return res.redirect("/forgotpass");
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    req.session.email = email;
    req.session.otp = otp;
    req.session.otpGeneratedAt = Date.now();
    await sendotp(email, otp);
    req.session.toast = "OTP sent to your email.";
    res.redirect("/verifyotp");
  } catch (error) {
    console.error("❌ Error in /forgotpassword:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export default forgotpassword_router;
