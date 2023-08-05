const express = require('express');
const router = express.Router();
const Admin = require('./adminService')
const jwt = require('jsonwebtoken')
function login(req,res){
    const body = req.body
    const {admin_email,admin_password} = body
    console.log(req.body);
    const data ={admin_email,admin_password}

    
    Admin.adminlogin(data,(err,results)=>{
if(err){
    return res.status(500).json({error:err});
}
else if(results.length == 0){
    return res.status(203).json({
        message:"email and password doesnot match"
    })
}
else{
    const token = jwt.sign({
        email: body.email
         },'super')

         return res.status(200).json({
          success:2,
          message:results ,
          token:token
        })
}
    })

}

router.post('/adminlogin',login)


module.exports = router;