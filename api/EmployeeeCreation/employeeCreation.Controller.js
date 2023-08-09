const { json } = require('express');
const {getEmpDetails,Empupdation,getempLogin,getregistredEmail} = require('./emplueeCreation.service');
const jwt = require('jsonwebtoken');
module.exports={
    
    getEmpDetails : (req, res) => {
        const id = req.params.id;
        getEmpDetails(id, (err, results) => {
          if (err) {
            return res.status(400).json({
              success: 0,
              message: err,
            });
          }
      
          if (results.length === 0) {
            return res.status(200).json({
              success: 1,
              message: "No records",
            });
          }
      
          const modifiedResults = {
            card: results.map((item) => ({
              emp_name: item.emp_name,
              isuence_id: item.isuence_id,
              experience: item.experience,
              WorkAvl_from: item.WorkAvl_from,
              work_avl_to: item.work_avl_to,
            })),
            screen: results.map((item) => ({
              emp_address: item.emp_address,
              emp_location: item.emp_location,
              emp_profile_pic: item.emp_profile_pic, // Add the data URL prefix
              emp_email: item.emp_email,
              trining_course: item.trining_course,
              emp_phone: item.emp_phone,
            })),
          };
      
          return res.status(200).json({
            success: 1,
            data: modifiedResults,
          });
        });
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
                return res.status(203).json("Employee email and password does not match"
                )
            }
            else{
                const token = jwt.sign({
                    email: body.emp_email
                 },'super')
     
                 return res.status(200).json({
                  success:2,
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