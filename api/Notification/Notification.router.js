const router = require("express").Router();
const {checkEmpAvailbility,getAssistanceMessge} = require('./Notification.controller')

router.post('/loc',checkEmpAvailbility)
router.get('/msg',getAssistanceMessge)

module.exports = router;

