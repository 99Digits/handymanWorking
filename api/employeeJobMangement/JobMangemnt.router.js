const router = require("express").Router();
const {EmpJobMangment,workerserviceHistory}  = require('./Jobmangemnt.controller')

router.post('/insert',EmpJobMangment);
router.get('/workerhistory/:id',workerserviceHistory)

module.exports=router;