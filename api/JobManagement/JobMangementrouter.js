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

    //array for image upload
    const afterwork =[];
    const beforeWork = [];
    const serviceName = [];
;

    if (req.files && Object.keys(req.files).length > 0) {
      if(req.files['work_image_after']){
        const afterWorkImage = req.files['work_image_after']
        afterwork.push(...afterWorkImage.map((file)=>file.filename))
      }
      if(req.files['work_image_before']){
        const beforeworkImage=req.files['work_image_before']
        beforeWork.push(...beforeworkImage.map((file)=>file.filename))
      }
      } else {
        console.log('No files were uploaded or field names did not match.');
      }


      const afterimagearray = JSON.stringify(afterwork)
      const afterArrayString = JSON.parse(afterimagearray).join(',')
     


      const beforeimageArray = JSON.stringify(beforeWork)
      const beforeArrayString = JSON.parse(beforeimageArray).join(',')
      
      const {emp_id,reached_time,job_reject,reject_reason,leaving_time,service_name_slno,service_type_slno, work_location,
        work_date, } = req.body;
      serviceName.push(service_name_slno)
      const service = JSON.stringify(serviceName)
      const serviceArray = JSON.parse(service)
      console.log(serviceArray);


      // const {work_image_before,work_image_after} = req.files
     
      const data = {emp_id,reached_time,job_reject,reject_reason,leaving_time,
        service_name_slno:serviceArray,
        service_type_slno ,
        work_image_before: beforeArrayString,
        work_image_after: afterArrayString,
        work_location,
        work_date
      }



        jobdetl.jobcompletion(data,(err,message)=>{
            if(err){
                return res.status(500).json({error:err});
            }
            res.json({success:2,message})
        })
  }



  function jobDetlToEmp(req,res){
    jobdetl.jobdeatils((err,result)=>{
      if(err){
        return res.status(500).json({})
      }
      else if(result.length == 0){
        return res.status(203).json({
          success:1,
          message:'no services are booking',
          data:[]
        })

      }
      else {
        res.json({success:2,result})
      }
    })

  }
  

  router.post('/jobdetl',upload.fields([
    {name:"work_image_before",maxCount:10},
    {name:"work_image_after",maxCount:10}
  ]),jobmangement)

  router.get('/getJobdetl',jobDetlToEmp);



module.exports = router