
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const key = "otp-secret-key"


async function createOTP(params, callback) {
  const otp = otpGenerator.generate(4, {
    alphabet: false,
    upperCase: false,
    specialChars: false
  });
// otp expires 5 min
  const xx = 5 * 60 * 1000;
  const expires = Date.now() + xx;
  const data = `${params.phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
  const fullhash = `${hash}.${expires}`;

  console.log(`Your OTP is ${otp}`);


  //send sms 
  return callback(null, fullhash);
}


async function ValidateOTP(params,callback){
    let [hashValue,expires]=params.hash.split('.')

    let now = Date.now();
    if(now>parseInt(expires)) 
    return callback("otp expired")
    const data = `${params.phone}.${otp}.${expires}`;
    let newcalculateHash = crypto 
    .createHmac("sha256",key)
    .update(data)
    .digest("hex")
    if(newcalculateHash===hashValue){
        return callback(null,'success')
    }
    return callback ('invalid otp')
}

module.exports ={
    router,
    ValidateOTP,
    createOTP
} 