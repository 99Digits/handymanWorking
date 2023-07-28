const router = require("express").Router();
const multer = require('multer')
const path = require('path')


const {getEmpDetails,Empupdation,getempLogin,getregistredEmail} = require('./employeeCreation.Controller')



router.get('/getempdetl/:id',getEmpDetails);
router.patch('/Empupdation',Empupdation);
router.post('/empLogin',getempLogin);
router.get('/email/:id',getregistredEmail);








module.exports=router;