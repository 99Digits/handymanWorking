const express = require('express');
const router = express.Router();


// const nodemailer = require('nodemailer');
// const otpGenerator = require('otp-generator');

// // Create a nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'your-email-service-provider',
//   auth: {
//     user: 'your-email',
//     pass: 'your-password'
//   }
// });

// // Generate OTP
// const generateOTP = () => {
//   const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
//   return otp;
// };

// // Send OTP via email
// const sendOTP = async (email, otp) => {
//   try {
//     await transporter.sendMail({
//       from: 'your-email',
//       to: email,
//       subject: 'OTP Verification',
//       text: `Your OTP for verification is: ${otp}`
//     });
//     console.log('OTP sent successfully');
//   } catch (error) {
//     console.error('Failed to send OTP:', error);
//     throw new Error('Failed to send OTP');
//   }
// };

// // Verify OTP
// const verifyOTP = (enteredOTP, generatedOTP) => {
//   return enteredOTP === generatedOTP;
// };

// // Example usage
// const email = 'user@example.com'; // Replace with the user's email
// const generatedOTP = generateOTP();

// sendOTP(email, generatedOTP)
//   .then(() => {
//     // Prompt the user to enter the OTP and verify it
//     const enteredOTP = '123456'; // Replace with the OTP entered by the user
//     const isOTPValid = verifyOTP(enteredOTP, generatedOTP);
//     if (isOTPValid) {
//       console.log('OTP verification successful');
//       // Grant access to the user
//     } else {
//       console.log('OTP verification failed');
//       // Deny access to the user
//     }
//   })
//   .catch((error) => {
//     console.error('OTP verification failed:', error);
//     // Handle the error and deny authentication
//   });


// // const router = require("express").Router();


// // const myMiddleware = (req, res, next) => {
// //     // Your middleware logic here
// //     next();
// //   };

// //   router.use(myMiddleware);


//   module.exports = router;


const axios = require('axios');
const { response } = require('express');
const formData = require('form-data')


const sendotpMsg = async()=>{
    try {
        const data = new formData
        data.append('mobile','')
        data.append('sender_id',''),
        data.append('message','hey customer your otp code is (code)')
        data.append('expiry','900');

const response = await axios({
method:"post",
url:'http://api/otpverification/send',
headers:{
    Authorization:'Token',
    ...data.getHeaders(),
},
     data:data,
    });
    console.log('data=>',response?.data);
    console.log("ghhgjj");

    } catch (error) {
        console.log("error found");
        console.log(error.message);
        
    }
};

const verifyotp=async()=>{
    try {
        const data = new formData();
        data.append('otp_id','')
        data.append("otp_code",'');
        const response = await axios ({
            method:'POST',
            url:'http://d7network.com/api/verifier/verify',
            headers:{
                Authorization:'Token',
                ...data.getHeaders(),
            },
            data:data,
        })
        console.log(response);
    } catch (err) {
        console.log(err?.messgae);
    }
}



verifyotp();
sendotpMsg();


 module.exports = router;