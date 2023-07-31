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

  const upload = multer({ storage: storage });

  router.post('/upload', upload.single('image'), (req, res) => {
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
  
    // You can perform further processing with the uploaded image here
  
    res.status(200).json({ message: 'Image uploaded successfully' });
  });


// router.post('/insert',upload.array("image") ,insertservicereg);
router.patch('/update',serviceupdation);
router.get('/select/:id',ServiceRegistartionselect);
router.post('/accept',serviceAccept)
module.exports=router;