// router.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Employeeservice  = require('./Employeeservice')

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




router.post('/empInsert', uploads.single('emp_profile_pic'), EmployeeCreation);
router.patch('/update',uploads.single("emp_profile_pic"), EmployeeUpdation)

module.exports = router;
