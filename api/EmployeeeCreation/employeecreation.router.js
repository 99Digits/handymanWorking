const router = require("express").Router();

const {EmployeeCreation,getEmpDetails,Empupdation,getempLogin,getregistredEmail} = require('./employeeCreation.Controller')

router.post('/empInsert',EmployeeCreation);
router.get('/getempdetl/:id',getEmpDetails);
router.patch('/Empupdation',Empupdation);
router.post('/empLogin',getempLogin);
router.get('/email/:id',getregistredEmail);

module.exports=router;