const router = require("express").Router();

const {getEmpDetails,Empupdation,getempLogin,getregistredEmail} = require('./employeeCreation.Controller')
const {EmployeeCreation} = require('./emplueeCreation.service')
router.post('/empInsert',EmployeeCreation);
router.get('/getempdetl/:id',getEmpDetails);
router.patch('/Empupdation',Empupdation);
router.post('/empLogin',getempLogin);
router.get('/email/:id',getregistredEmail);

module.exports=router;