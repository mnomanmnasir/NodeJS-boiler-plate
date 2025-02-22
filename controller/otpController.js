const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

let otpStorage = {}; // Temporary in-memory OTP storage

// ✅ Send OTP to Email
exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStorage[email] = otp;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) return res.status(500).json({ message: "Email sending failed" });
        res.json({ message: "OTP sent to email" });
    });
};

// ✅ Verify OTP & Reset Password
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!otpStorage[email] || otpStorage[email] !== parseInt(otp)) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    delete otpStorage[email];

    res.json({ message: "Password reset successful" });
};
