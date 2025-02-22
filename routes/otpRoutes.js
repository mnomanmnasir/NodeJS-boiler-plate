const express = require("express");
const { sendOtp, resetPassword } = require("../controller/otpController");
const { validateOtpInput } = require("../middlewares/otpMiddleware"); // ✅ Import Middleware

const router = express.Router();

// Routes
router.post("/send-otp", sendOtp);
router.post("/reset-password", validateOtpInput, resetPassword);

module.exports = router;
