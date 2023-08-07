const pool = require('../../databaseconnection')
// const multer = require('multer')
// const path = require('path')

module.exports={
  
  
    getuserloginpassword:(data,callback)=>{
      pool.query(`SELECT user_fname,id , app_user FROM user_creation WHERE email=? and user_pasword =?`,
      [
        data.email,
        data.user_pasword
    ],
      (error,results,feilds)=>{
        if(error){
          return callback(error)
        }
        // const token = jwt.sign({
        //   email: data.email
        //   },'super')
        return callback(null,results);
      },
      )
    },
    getuserdetails:(id,callback)=>{
      pool.query(`select id, CONCAT(user_creation.user_fname,' ',user_creation.user_lname) AS customer_Name, 
      user_fname,
      user_lname,
      email, 
      phone,
      address,
      user_pasword,
      user_profile_pic	
      from user_creation WHERE id=?;`,
      [id],
      (error,results,feilds)=>{
        if(error){
          return callback(error)
        }

        return callback(null,results);
      },


      )
    }


  }