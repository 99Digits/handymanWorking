const router = require("express").Router();
const {selectSubscrptionService} = require('./subscription.controller')

router.get('/get/:id',selectSubscrptionService)

module.exports=router;