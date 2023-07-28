// router.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userservice = require('./UserService')

// ... (rest of the code)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'api/images/image');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const uploads = multer({ storage: storage });




function userCreation(req, res) {
    const user_profile_pic	 = req.file.filename;
   
  const {
    user_fname, user_lname, phone,address,email,user_pasword,app_user	
  } = req.body;

  userservice.checkIfEmailExists(email, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
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

router.post('/Registration', uploads.single('user_profile_pic'), userCreation);

module.exports = router;
