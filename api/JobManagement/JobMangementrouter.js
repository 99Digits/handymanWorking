const express = require('express')
const multer = require('multer');
const router = express.Router();
const jobdetl = require('../JobManagement/Jobmangmentservice')


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


  function jobmangement(req,res){
    const workImageBefore = req.files['work_image_before'];
    const workImageAfter = req.files['work_image_after'];



    if (req.files && Object.keys(req.files).length > 0) {
        // Loop through the fields and handle file uploads
        Object.keys(req.files).forEach((fieldName) => {
          const fileArray = req.files[fieldName];
          const fileName = fileArray[0].filename;
          console.log(`Uploaded file for field '${fieldName}': ${fileName}`);
        });
      } else {
        console.log('No files were uploaded or field names did not match.');
      }
      // const {work_image_before,work_image_after} = req.files
      const {emp_id,reached_time,job_reject,reject_reason,leaving_time,service_name_slno,service_type_slno } = req.body;
      const data = {emp_id,reached_time,job_reject,reject_reason,leaving_time,service_name_slno,service_type_slno ,
        work_image_before: workImageBefore.map(file => file.filename),
        work_image_after: workImageAfter.map(file => file.filename),
      }

        jobdetl.jobcompletion(data,(err,message)=>{
            if(err){
                return res.status(500).json({error:err});
            }
            res.json({success:2,message})
        })


  }
  

  router.post('/jobdetl',upload.fields([
    {name:"work_image_before"},
    {name:"work_image_after"}
  ]),jobmangement)

//   router.post('/upload',upload.fields([
//     {name:'work_image_before' },)],jobmangement)


module.exports = router