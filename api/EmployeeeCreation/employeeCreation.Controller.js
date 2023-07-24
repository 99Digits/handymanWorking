const {getEmpDetails,Empupdation,getempLogin,getregistredEmail} = require('./emplueeCreation.service');
const jwt = require('jsonwebtoken');
module.exports={
    
      getEmpDetails:(req,res)=>{
        const id = req.params.id;
        getEmpDetails(id,(err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"no records"
                })
            }
            return res.status(200).json({
                success:2,
                data:results
            })
        })
      },
      Empupdation:(req,res)=>{
        const body = req.body;
        Empupdation(body,(err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"no records"
                })
            }
            return res.status(200).json({
                success:2,
                data:"Employee details updated"
            })
        })
      },
      getempLogin:(req,res)=>{
        const body = req.body;
        getempLogin(body,(err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(401).json({
                    success:1,
                    message:"Employee email and password does not match"
                })
            }
            else{
                const token = jwt.sign({
                    email: body.emp_email
                 },'super')
     
                 return res.status(200).json({
                  
                  message:results ,
                  token:token
                })
  
              }
        })
      },
      getregistredEmail:(req,res)=>{
        const id = req.params.id;
        getregistredEmail(id,(err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"user email doesnot exist! please sign up"
                })
            }
            return res.status(200).json({
                success:2,
                data:results
            })
        })
      },
}