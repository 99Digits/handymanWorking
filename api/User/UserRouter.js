// router.js
const express = require('express');
const multer = require('multer')
const router = express.Router();
const userservice = require('./UserService');



const storage = multer.diskStorage({
 destination: (req, file, callback) => {
 callback(null, './upload');
 },
 filename: (req, file, callback) => {
 const filename = `image${Date.now()},${file.originalname}`;
  callback(null, filename);
 }
  });
  
  const fileFilter = (req, file, callback) => {
   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
   callback(null, true);
 } else {
   callback(new Error('Only .png, .jpg, and .jpeg files are allowed'));
   }
  };
  
  const upload = multer({
   storage: storage,
  fileFilter: fileFilter,
   

  });


// create user profile

function userCreation(req, res) {       
    const user_profile_pic	 = req.file.filename;

  const {
    user_fname, user_lname, phone,address,email,user_pasword,app_user	
  } = req.body;

  userservice.checkIfEmailExists(email, (err) => {
    if (err) {
      return res.status(203).json({ error: err });
    }

    const data = {
        user_fname, user_lname, phone,address,email,user_pasword,app_user,user_profile_pic	
    };


    userservice.insertuser(data, (err, message) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      res.json({ success: 2, message });
    });
  });
}


//update user profile

function userUpdation (req,res){
  const user_profile_pic	 = req.file.filename;
  const {
    user_fname, user_lname, phone,address,email,user_pasword,app_user,id
  } = req.body;
  userservice.checkIfupdateEmailExists(email,id,(err)=>{
    if(err){
      return res.status(500).json({error:err})
    }
    const data = {
      user_fname, user_lname, phone,address,email,user_pasword,app_user,user_profile_pic,id
  };
  userservice.Updateuser(data,(err,message)=>{
    if(err){
      return res.status(500).json({error:err});
    }
    res.json({ success: 2, message });
  })
  })
}

router.post('/Registration', upload.single('user_profile_pic'), userCreation);
router.patch('/updation',upload.single('user_profile_pic'),userUpdation);


module.exports = router;

