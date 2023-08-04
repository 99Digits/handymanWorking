const express=require('express')
const router = express.Router();
const {serviceupdation,ServiceRegistartionselect,
    serviceAccept} = require('./serviceRegistration.controller');

router.patch('/update',serviceupdation);
router.get('/select/:id',ServiceRegistartionselect);
router.post('/accept',serviceAccept)






module.exports=router;