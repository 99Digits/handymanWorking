
const express = require('express');
const router = express.Router()
const { sendotp, verifyOTP } = require('./otpverification.contrroller');


router.post('/sendOTP',sendotp)
router.post('/verifyOTP',verifyOTP)


module.exports = router;