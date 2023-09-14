// const express = require('express');
// const router = express.Router();


// // const nodemailer = require('nodemailer');
// // const otpGenerator = require('otp-generator');

// // // Create a nodemailer transporter
// // const transporter = nodemailer.createTransport({
// //   service: 'your-email-service-provider',
// //   auth: {
// //     user: 'your-email',
// //     pass: 'your-password'
// //   }
// // });

// // // Generate OTP
// // const generateOTP = () => {
// //   const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
// //   return otp;
// // };

// // // Send OTP via email
// // const sendOTP = async (email, otp) => {
// //   try {
// //     await transporter.sendMail({
// //       from: 'your-email',
// //       to: email,
// //       subject: 'OTP Verification',
// //       text: `Your OTP for verification is: ${otp}`
// //     });
// //     console.log('OTP sent successfully');
// //   } catch (error) {
// //     console.error('Failed to send OTP:', error);
// //     throw new Error('Failed to send OTP');
// //   }
// // };

// // // Verify OTP
// // const verifyOTP = (enteredOTP, generatedOTP) => {
// //   return enteredOTP === generatedOTP;
// // };

// // // Example usage
// // const email = 'user@example.com'; // Replace with the user's email
// // const generatedOTP = generateOTP();

// // sendOTP(email, generatedOTP)
// //   .then(() => {
// //     // Prompt the user to enter the OTP and verify it
// //     const enteredOTP = '123456'; // Replace with the OTP entered by the user
// //     const isOTPValid = verifyOTP(enteredOTP, generatedOTP);
// //     if (isOTPValid) {
// //       console.log('OTP verification successful');
// //       // Grant access to the user
// //     } else {
// //       console.log('OTP verification failed');
// //       // Deny access to the user
// //     }
// //   })
// //   .catch((error) => {
// //     console.error('OTP verification failed:', error);
// //     // Handle the error and deny authentication
// //   });


// // // const router = require("express").Router();


// // // const myMiddleware = (req, res, next) => {
// // //     // Your middleware logic here
// // //     next();
// // //   };

// // //   router.use(myMiddleware);


// //   module.exports = router;


// const axios = require('axios');
// const { response } = require('express');
// const formData = require('form-data')


// const sendotpMsg = async()=>{
//     try {
//         const data = new formData
//         data.append('mobile','')
//         data.append('sender_id',''),
//         data.append('message','hey customer your otp code is (code)')
//         data.append('expiry','900');

// const response = await axios({
// method:"post",
// url:'http://api/otpverification/send',
// headers:{
//     Authorization:'Token',
//     ...data.getHeaders(),
// },
//      data:data,
//     });
//     console.log('data=>',response?.data);
//     console.log("ghhgjj");

//     } catch (error) {
//         console.log("error found");
//         console.log(error.message);
        
//     }
// };

// const verifyotp=async()=>{
//     try {
//         const data = new formData();
//         data.append('otp_id','')
//         data.append("otp_code",'');
//         const response = await axios ({
//             method:'POST',
//             url:'http://d7network.com/api/verifier/verify',
//             headers:{
//                 Authorization:'Token',
//                 ...data.getHeaders(),
//             },
//             data:data,
//         })
//         console.log(response);
//     } catch (err) {
//         console.log(err?.messgae);
//     }
// }



// verifyotp();
// sendotpMsg();


//  module.exports = router;




const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const twilio = require('twilio');


const app = express();
const port = 3000;
const pool = require('../../databaseconnection')

// Twilio credentials
const accountSid = 'AC1d3929db63748c2550059970a00f92b2';
const authToken = 'e0f08f0550913e09cef2502088a2e1b5';
const client = twilio(accountSid, authToken);

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

app.use(bodyParser.json());

// Endpoint to send OTP via SMS
router.post('/sendOTP', (req, res) => {

  const phoneNumber = req.body.phoneNumber;
  console.log(phoneNumber);

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const otp = generateOTP();

  client.messages
    .create({
      body: `Your OTP for authentication is: ${otp}`,
      from: '+447401093135',
      to: phoneNumber,
    })
    .then(() => {
      const sql = `INSERT INTO otp_tokens (phone_number, otp_code, expires_at)
      VALUES (?, ?, TIMESTAMPADD(MINUTE, 5, NOW()));`

      const values = [phoneNumber,otp]

      pool.query(sql,values,(err,results)=>{
        if(err){
         console.error('Error storing OTP in the database:', err);
        }
        else{
            res.json({ message: 'OTP sent successfully' });
        }
      })

      // res.json({ message: 'OTP sent successfully' });
    })
    .catch((error) => {
        console.log(error);
      res.status(500).json({ error: 'Failed to send OTP' });
    });
});

// Endpoint to verify OTP
// router.post('/verifyOTP', (req, res) => {
//   const { phoneNumber, otp } = req.body;



//   const sql = `
//   UPDATE otp_tokens
//   SET is_verified = 1
//   WHERE phone_number = ? 
//     AND otp_code = ? 
//     AND is_verified = 0 
//     AND expires_at >= NOW()
// `;
//   const values = [phoneNumber, otp]
//   console.log(values);
//   // console.log(otpCode);

//   pool.query(sql,values,(err,results)=>{
 
//     if(err){
//       console.error("Error verifying otp",err);;
//     }
//     else if(results.affectedRows === 1){
//       res.status(200).json("otp verified succesfully")
//     }
//     else{
//       console.error("time expired , resend otp ");

//     }
//   })

//   if (!phoneNumber || !otp) {
//     return res.status(400).json({ message: 'Phone number and OTP are required' });
//   }

//   // In a real application, you should store OTPs in a database for verification.

//   // For simplicity, here we compare the received OTP with a hardcoded value.
//   const savedOTP = otp; // Replace with the OTP saved in your database

//   if (otp == savedOTP) {
//     console.log(otp);
//     console.log(savedOTP);
//     res.json({ message: 'OTP verified successfully' });
//   } else {
//     res.status(401).json({ error: 'OTP verification failed' });
//   }
// });

router.post('/verifyOTP',(req,res)=>{
  const {phoneNumber,otp} = req.body

  const sqlverifyOTP = `UPDATE otp_tokens
  SET is_verified = 1
  WHERE phone_number = ? 
    AND otp_code = ? 
    AND is_verified = 0 
    AND expires_at >= NOW()`;

  const sqlretriveOTP = `SELECT otp_code
    FROM otp_tokens
    WHERE phone_number = ?
    AND is_verified = 0
    AND expires_at >= NOW()`


    pool.query(sqlverifyOTP,[phoneNumber,otp],(err,results)=>{
      if(err){
        console.error("error verifying otp",err);
        
         return res.status(500).json({error:"internal server error"})
      }
      if(results.affectedRows === 1){
        return res.status(200).json({message:"otp verified succesfully"})
      }
      else{
        pool.query(sqlretriveOTP,[phoneNumber],(err,results)=>{
          if(err){
            console.error("Error retrieving OTP", err);
          return res.status(500).json({ error: 'Internal server error' });
          }
          if (results.length === 1) {
            const savedOTP = results[0].otp_code;
            res.status(401).json({ error: 'OTP verification failed', savedOTP });
          } else {
            res.status(404).json({ error: 'OTP not found or expired' });
          }
        })
      }
    
    })
})


module.exports = router;