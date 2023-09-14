const express=require('express')
const router = express.Router();
const {ServiceRegistartionselect,
    serviceAccept} = require('./serviceRegistration.controller');


router.get('/select/:id',ServiceRegistartionselect);
router.post('/accept',serviceAccept)






module.exports=router;