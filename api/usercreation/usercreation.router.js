
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
const mysql = require('mysql');

const app = express();
// You can use any desired port number

// MySQL configuration
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"handyman",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint for user registration
router.post('/register', (req, res) => {
  const { user_fname, user_lname, phone,address,email,user_pasword,app_user,user_profile_pic } = req.body;

  // Check if email is already registered
  connection.query('SELECT * FROM user_creation WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error querying database: ', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      // Email is already registered
      res.status(409).json({ error: 'Email already exists' });
    } else {
      // Email is unique, proceed with registration
      const newUser = { user_fname, user_lname, phone,address,email,user_pasword,app_user,user_profile_pic };
      connection.query('INSERT INTO user_creation SET ?', newUser, (err, result) => {
        if (err) {
          console.error('Error inserting user into database: ', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(201).json({ message: 'User registered successfully' });
        }
      });
    }
  });
});

// Start the server







module.exports=router;