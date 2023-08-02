const {getuserloginpassword,getuserdetails} = require('./usercreation.service')
const {user} = require('../../Validation/validation_schema')
const multer= require('multer')

const jwt = require('jsonwebtoken');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, './upload');
    },
    filename: (req, file, callback) => {
    const filename = `image${Date.now()},${file.originalname}`;
     callback(null, filename);
    }
     });

       
  const upload = multer({
    storage: storage,
 //  fileFilter: fileFilter,
   });
     

module.exports ={
    insertuser :(req,res)=>{
        const body=req.body;
        insertuser(body,(err,results)=>{
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
                message:"user created succesfully"
            })
        })
      },

// validation email 
    //   adduservalidation :async(req,res,next)=>{
    //     const value = await user.checkinsrtusername(req.body);
    //     if(value.error){
    //         res.status(400).json("internal server error")
    //     }
    //     else{
    //         next();
    //     }
    //   },


    
      getuserloginpassword:(req,res)=>{
        const body= req.body
        getuserloginpassword(body,(err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }

            else if(results.length==0){
                return res.status(203).json({
                    success:1,
                    message:"username and password id does not match"
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
},
getuserdetails:(req,res)=>{
    const id=req.params.id;



    getuserdetails(id,(err,results)=>{
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
            message:results
        })
    })
  },




// get id and name of user 
// getUserIDName:(req,res)=>{
//     const body=req.body;
//     getUserIDName(body,(err,results)=>{
//           if(err){
//             return res.status(400).json({
//                 success:0,
//                 message:err
//             })
//         }
//         else if(results.length==0){
//             return res.status(200).json({
//                 success:1,
//                 message:"no records"
//             })
//         }
//         return res.status(200).json({
//             success:2,
//             message:results
//         })
//     })
//   },

}