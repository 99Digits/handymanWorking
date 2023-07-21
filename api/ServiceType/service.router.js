const router = require("express").Router();

const {getserviceType,getservicename,getservicesubcription,getrequirement} = require('./serive.controller');

router.get('/gettype',getserviceType);
router.get('/servicename/:id',getservicename);
// router.get('/subscrption/:id', getservicesubcription);
// router.get('/requirement',getrequirement)
module.exports=router;