
const router = require("express").Router();
const {updateuser,getuserloginpassword,getuserdetails} = require('./usercreation.controller');
const {insertuser} = require('./usercreation.service')
const multer = require('multer')
const path = require('path')

 const storage = multer.diskStorage({
        destination:(req,file,cb) =>{
          cb(null,'api/images/image')
        },
        
          __filename:(req,file,cb)=>{
            cb(null,file.feildname + '_' +Date.now()+path.extname(file.originalname))
          }
      })
      
      const uploads = multer({
        storage:storage
      })
router.post('/register',uploads.single('user_profile_pic'),insertuser);
router.patch('/updateuser',updateuser);
router.post('/loginpassword',getuserloginpassword);
router.get('/detl/:id',getuserdetails)

// router.post('/',getUserIDName)
// router.get('/getemail/:id',getuserEmail);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();




// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));









module.exports=router;