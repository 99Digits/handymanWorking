const twilio= require('twilio')
const accountSid = 'AC1d3929db63748c2550059970a00f92b2';
const authToken = '9f7cb459962483e0ae1f98e009b9fff1';
const client = twilio(accountSid, authToken);
const pool = require('../../databaseconnection');

module.exports ={

    
sendotp :(req, res) => {
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
      }
    const phoneNumber = req.body.phoneNumber;
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

      })
      .catch((error) => {
          console.log(error);
        res.status(500).json({ error: 'Failed to send OTP' });
      });
  },

// otp 
  verifyOTP:(req,res)=>{
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
              res.status(203).json({ error: 'OTP not found or expired' });
            }
          })
        }
      
      })
  }

}
