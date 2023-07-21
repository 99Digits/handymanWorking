
const router = require("express").Router();
const {insertuser,updateuser,getuserloginpassword,getuserdetails} = require('./usercreation.controller');

router.post('/userinsert',insertuser);
router.patch('/updateuser',updateuser);
router.post('/loginpassword',getuserloginpassword);
router.get('/detl/:id',getuserdetails)

// router.post('/',getUserIDName)
// router.get('/getemail/:id',getuserEmail);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const pool = require('../../databaseconnection')

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint for user registration
router.post('/register', (req, res) => {
  const { user_fname, user_lname, phone,address,email,user_pasword,app_user,user_profile_pic } = req.body;

  // Check if email is already registered
  pool.query('SELECT * FROM user_creation WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error querying database: ', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      // Email is already registered
      res.status(400).json({ error: 'Email already exists' });
    } else {
      // Email is unique, proceed with registration
      const newUser = { user_fname, user_lname, phone,address,email,user_pasword,app_user,user_profile_pic };
      pool.query('INSERT INTO user_creation SET ?', newUser, (err, result) => {
        if (err) {
          console.error('Error inserting user into database: ', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).json({ message: 'User registered successfully' });
        }
      });
    }
  });
});

// Start the server







module.exports=router;