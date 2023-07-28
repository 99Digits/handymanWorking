const pool = require('../../databaseconnection')
function checkIfEmailExists(email, callback) {
    pool.query('SELECT * FROM user_creation WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        callback('internal server error');
      } else if (results.length > 0) {
        callback('email already exists');
      } else {
        callback(null);
      }
    });
  }
  
  function insertuser(data, callback) {
    pool.query(`INSERT INTO user_creation SET ?`, data, (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        callback('internal server error');
      } else {
        console.log('User created successfully');
        callback(null, 'new employee registered successfully');
      }
    });
  }
  
  module.exports = {
    checkIfEmailExists,
    insertuser,
  }