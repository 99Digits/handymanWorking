
const router = require("express").Router();
const {updateuser,getuserloginpassword,getuserdetails} = require('./usercreation.controller');
const {insertuser} = require('./usercreation.service')
router.post('/register',insertuser);
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