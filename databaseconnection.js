
const mysql = require("mysql2");
const pool = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"handyman",
});
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

module.exports=pool;