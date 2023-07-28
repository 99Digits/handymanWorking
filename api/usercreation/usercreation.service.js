const pool = require('../../databaseconnection')
// const multer = require('multer')
// const path = require('path')

module.exports={
  
    updateuser:(data,callback)=>{
      pool.query(`update user_creation set 
        user_fname =?,
        user_lname =?,
        phone=?,
        address=?,
        email=?,
        user_pasword=?,
        app_user =?,
        user_profile_pic =?
        where id=?`, 
        [
            data.user_fname,
            data.user_lname,
            data.phone,
            data.address,
            data.email,
            data.user_pasword,
            data.app_user,
            data.user_profile_pic,
            data.id
    
        ],
        (error,results,feilds)=>{
          if(error){
            return callback(error)
          }
          return callback(null,results);
        }
      )
    },



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
      pool.query(`select id , CONCAT(user_creation.user_fname,' ',user_creation.user_lname) AS customer_Name, 
      email, 
      phone 
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