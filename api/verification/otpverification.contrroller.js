exports.otplogin =(req,res,next) =>{
otpverificationservice.createOTP(req.body,(error,results)=>{
    if(error){
        return  next(error)
    }
    return res.status(200).send
    message:"success"
    data:results
}) 

exports.ValidateOTP = (req,res,next)=>{
    otpverificationservice.ValidateOTP(req.body,(error,results)=>{
        if(error){
            return  next(error)
        }
        return res.status(200).send
        message:"success"
        data:results
    })
}
}