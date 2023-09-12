const express = require('express')
const multer = require('multer');
const router = express.Router();
const servicebooking = require('./bookingservice');
const fs = require('fs');



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

// service booking  function
function booking(req,res){
  const sofaimage = [];
  const stainremoval =[];
  const carpetCleaning = [];
  const WindowCleaning = [];
  const gutterCleaning =[];
  const drivewayCleaning = [];

  if (req.files && Object.keys(req.files).length > 0) {

    //array of sofa cleaning
    if(req.files['serv_image_sofa']){
    const servimnageSofa = req.files['serv_image_sofa']
    sofaimage.push(...servimnageSofa.map((file) => file.filename));
    }

    // array of stain removal image
    if(req.files['serv_image_stain']){
    const stainImages = req.files['serv_image_stain']
    stainremoval.push(...stainImages.map((file)=>file.filename));
    }
 
    // array of  carpet cleaning  
    if(req.files['serv_image_carpet']){
    const carpetImage = req.files['serv_image_carpet']
    carpetCleaning.push(...carpetImage.map((file)=>file.filename));
    }

    // array of window claening 
    if(req.files['serv_image_window']){
    const windowImage = req.files['serv_image_window']
    WindowCleaning.push(...windowImage.map((file)=>file.filename));
    }

    //array of guttering cleaning image 
    if(req.files['serv_image_gutter']){
    const gutterImage = req.files['serv_image_gutter']
    gutterCleaning.push(...gutterImage.map((file)=>file.filename));
   
    }

    //array of driveway preesuure wash image 
    if(req.files['serv_image_driveway']){
    const drivewayImage = req.files['serv_image_driveway']
    drivewayCleaning.push(...drivewayImage.map((file)=>file.filename));  
    }
  } 

  else {
    console.log('No files were uploaded or field names did not match.');
  }

  // sofa service images  
  const jsonarray1 = JSON.stringify(sofaimage)
  const sofaService = JSON.parse(jsonarray1).join(',')

  // stain removal image service 
  const stainArray = JSON.stringify(stainremoval)
  const stainremovalService = JSON.parse(stainArray).join(',')

  // carpet cleaning servce images
  const carpetarray = JSON.stringify(carpetCleaning)
  const carpetImage = JSON.parse(carpetarray).join(',')

  // wingow claening service image
  const windowArray = JSON.stringify(WindowCleaning)
  const WindowservImage = JSON.parse(windowArray).join(',')

  // Guttering cleaning servicve image
  const GutterArray = JSON.stringify(gutterCleaning)
  const GutterservImage = JSON.parse(GutterArray).join(',')

  // driveway pressure wash service image
  const driveWayArray = JSON.stringify(drivewayCleaning)
  const driwayServImage = JSON.parse(driveWayArray).join(',')

  const {user_id ,ser_name_slno,serv_type_slno,serv_time,serv_date,serv_location,vehicle_id,vehicle_name} =req.body;

  // array of servuce name slno 
  const arrayvalues = [];
  arrayvalues.push(ser_name_slno)
  const jsonarray=JSON.stringify(arrayvalues);
  const parsearray=JSON.parse(jsonarray)
  
  const inputdata ={user_id,
    parsearray,
    serv_type_slno,
    serv_time,
    serv_date,
    serv_location,
    vehicle_id: vehicle_id && vehicle_id.length> 0 ? vehicle_id :null,
    vehicle_name: vehicle_name && vehicle_name.length > 0 ? vehicle_name :null,
    serv_image_stain: stainremovalService && stainremovalService.length > 0 ? stainremovalService: null,
    serv_image_sofa:sofaService && sofaService.length > 0 ? sofaService:null ,
    serv_image_carpet: carpetImage && carpetImage.length > 0 ? carpetImage: null,
    serv_image_window: WindowservImage && WindowservImage.length > 0 ? WindowservImage : null,
    serv_image_gutter: GutterservImage && GutterservImage.length > 0 ? GutterservImage : null,
    serv_image_driveway: driwayServImage && driwayServImage.length > 0 ? driwayServImage: null
  }

  
  servicebooking.serviceboking(inputdata, (err, results) => {
    if (err) {
    return res.status(500).json({ error: err });
    }
    res.json({ success: 2, results });
    });
  }
router.post(
  '/booking',
  upload.fields([
    { name: 'serv_image_sofa', maxCount: 10 },
    { name: 'serv_image_stain', maxCount: 10 },
    { name: 'serv_image_carpet', maxCount: 10 },
    { name: 'serv_image_window', maxCount: 10 },
    { name: 'serv_image_gutter', maxCount: 10 },
    { name: 'serv_image_driveway', maxCount: 10 },
  ]),
  booking
);

module.exports =router;