const router = require("express").Router();
const {otplogin,ValidateOTP} =require('./otpverification.contrroller')

router.post('/otplogin',otplogin)
router.post('/otpverify',ValidateOTP)


module.exports = router

