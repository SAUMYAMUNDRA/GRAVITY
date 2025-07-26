import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
export const sendotp=async (email,otp)=>{
    try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Gravity" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Password Reset',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>🔐 Your OTP Code</h2>
          <p>Your OTP for resetting your password is:</p>
          <h3 style="color: #4F46E5;">${otp}</h3>
          <p>It is valid for 5 minutes.</p>
        </div>
      `,
    };
     const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${info.messageId}`);
    } catch (error) {
        console.error(`❌ Failed to send OTP:`, error);
        throw error;
    }
}