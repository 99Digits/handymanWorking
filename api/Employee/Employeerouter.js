// router.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Employeeservice  = require('./Employeeservice')


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
//  fileFilter: fileFilter,
  });




// ... (rest of the code)

  





function EmployeeCreation(req, res) {
    const emp_profile_pic = req.file.filename;
   
  const {
    emp_firstname,
    emp_lastname,
    emp_phone,
    emp_address,
    emp_location,
    WorkAvl_from,
    work_avl_to,
    experience,
    isuence_id,
    trining_course,
    emp_password,
    emp_email,
    app_user,
  } = req.body;

  Employeeservice.checkIfEmailExists(emp_email, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    const data = {
      emp_firstname,
      emp_lastname,
      emp_phone,
      emp_address,
      emp_location,
      WorkAvl_from,
      work_avl_to,
      experience,
      isuence_id,
      trining_course,
      emp_password,
      emp_email,
      emp_profile_pic,
      app_user
    };

    Employeeservice.insertEmployee(data, (err, message) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      res.json({ success: 2, message });
    });
  });
};

function EmployeeUpdation(req,res){
  const emp_profile_pic = req.file.filename;
  const {
    emp_firstname,
    emp_lastname,
    emp_phone,
    emp_address,
    emp_location,
    WorkAvl_from,
    work_avl_to,
    experience,
    isuence_id,
    trining_course,
    emp_password,
    emp_email,
    app_user,
    emp_id
  } = req.body;
Employeeservice.checkIfupdateEmailExists(emp_email,(err,message)=>{
  if (err) {
    return res.status(500).json({ error: err });
  }
  const data = {
    emp_firstname,
    emp_lastname,
    emp_phone,
    emp_address,
    emp_location,
    WorkAvl_from,
    work_avl_to,
    experience,
    isuence_id,
    trining_course,
    emp_password,
    emp_email,
    emp_profile_pic,
    app_user,
    emp_id
  };

  Employeeservice.updateEmployee(data, (err, message) => {
    console.log(data);
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json({ success: 2, message });
  });
})
}




router.post('/empInsert', upload.single('emp_profile_pic'), EmployeeCreation);
router.patch('/update',upload.single("emp_profile_pic"), EmployeeUpdation)

module.exports = router;
