const express = require('express')
const multer = require('multer');
const router = express.Router();
const servicebooking = require('./bookingservice');


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
function booking(req,res){
  if (req.files && Object.keys(req.files).length > 0) {
    Object.keys(req.files).forEach((fieldName) => {
      const fileArray = req.files[fieldName];
      const fileName = fileArray[0].filename;
      
    });
  } else {
    console.log('No files were uploaded or field names did not match.');
  }
   const {serv_image_sofa,serv_image_stain,serv_image_carpet,serv_image_window,serv_image_gutter,serv_image_driveway} =req.files

    const {user_id ,ser_name_slno,serv_type_slno,serv_time,
        serv_date,serv_location,vehicle_id,vehicle_name} =req.body;
     
const inputdata ={user_id,
  ser_name_slno,
  serv_type_slno,
  serv_time,
    serv_date,
    serv_location,
    vehicle_id:vehicle_id && vehicle_id.length>0 ? vehicle_id :null,
    vehicle_name:vehicle_name && vehicle_name >0?vehicle_name :null,
    serv_image_stain: serv_image_stain && serv_image_stain.length > 0 ? serv_image_stain[0].filename : null,
    serv_image_sofa: serv_image_sofa && serv_image_sofa.length > 0 ? serv_image_sofa[0].filename : null,
    serv_image_carpet: serv_image_carpet && serv_image_carpet.length > 0 ? serv_image_carpet[0].filename : null,
    serv_image_window: serv_image_window && serv_image_window.length > 0 ? serv_image_window[0].filename : null,
    serv_image_gutter: serv_image_gutter && serv_image_gutter.length > 0 ? serv_image_gutter[0].filename : null,
    serv_image_driveway: serv_image_driveway && serv_image_driveway.length > 0 ? serv_image_driveway[0].filename : null
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
    { name: 'serv_image_sofa', maxCount: 1 },
    { name: 'serv_image_stain', maxCount: 1 },
    { name: 'serv_image_carpet', maxCount: 1 },
    { name: 'serv_image_window', maxCount: 1 },
    { name: 'serv_image_gutter', maxCount: 1 },
    { name: 'serv_image_driveway', maxCount: 1 },
  ]),
  booking
);


module.exports = router;