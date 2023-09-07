const express = require("express");
const router = express.Router();

const client = require('twilio')("AC2ab4913eb97cc385695d02e354214582", "902d06c0ace32915596babf34b4c9c0c");




// router.post('/',async(req,res)=>{
//     try {
//         const email = req.body;
//         if(!email) throw Error("email is required");
//     } catch (error) {
      
//     }
// })


module.exports = router;

