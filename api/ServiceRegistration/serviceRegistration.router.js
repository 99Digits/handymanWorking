const express=require('express')
const router = express.Router();
const {insertservicereg,serviceupdation,ServiceRegistartionselect,
    serviceAccept} = require('./serviceRegistration.controller');
const multer = require('multer')
const path = require('path');
const xx = require('../uploads')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filename = req.params.filename;
        const filePath = path.resolve(__dirname,'../uploads', filename);
      cb(null,filePath) // Uploads will be stored in the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
    }
  });

  const upload = multer({ storage: storage,
    dest:'api/images/image'
   });


  // router.post('/upload', upload.single('image'), (req, res) => {
    
  //   if (!req.file) {
  //     return res.status(400).json({ error: 'No image uploaded' });
  //   }
  
  //   // You can perform further processing with the uploaded image here
  
  //   res.status(200).json({ message: 'Image uploaded successfully' });
  // });


router.post('/insert',upload.array("image") ,insertservicereg);
router.patch('/update',serviceupdation);
router.get('/select/:id',ServiceRegistartionselect);
router.post('/accept',serviceAccept)


router.post('/upload-images', upload.fields([
  { name: 'serv_image_stain', maxCount: 1 },
  { name: 'serv_image_window', maxCount: 1 },
  { name: 'serv_image_guttering', maxCount: 1 },
  { name: 'serv_image_driveway', maxCount: 1 },
  {name:'serv_image_sofa',maxCount:1}
]), (req, res) => {
  // The 'upload.fields' middleware will process the image uploads and store them in the 'req.files' object.
  // The images will be accessible as 'req.files.serv_image_stain', 'req.files.serv_image_window', etc.
  
  // After processing the images, you can call the 'insertservicereg' function with the uploaded image data.
  const data = req.body; // Assuming the other form fields are sent as part of the request body.
  const images = req.files; // Access the uploaded images from the 'req.files' object.
  
  // Call the 'insertservicereg' function with the data and images.
  insertservicereg(data, images, (error, results) => {
    if (error) {
      // Handle the error, e.g., send an error response.
      return res.status(500).json({ error: 'Failed to insert data into the database.' });
    }
    
    // Data successfully inserted. Send a success response.
    return res.json({ message: 'Data inserted successfully.' });
  });
});


module.exports=router;