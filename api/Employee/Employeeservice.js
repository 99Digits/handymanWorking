const pool = require('../../databaseconnection')


function checkIfEmailExists(email, callback) {
  pool.query('SELECT * FROM emp_creation WHERE emp_email = ?', [email], (err, results) => {
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

function insertEmployee(data, callback) {
  pool.query(`INSERT INTO emp_creation SET ?`, data, (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      callback('internal server error');
    } else {
      console.log('User created successfully');
      callback(null, 'new employee registered successfully');
    }
  });
}
function updateEmployee(data, callback) {
  pool.query(`UPDATE emp_creation SET ? WHERE emp_id =?`, [data,data.id], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      callback('internal server error');
    } else {
      console.log('User created successfully');
      callback(null, 'profile updated successfully');
    }
  });
}
module.exports = {
  checkIfEmailExists,
  insertEmployee,
  updateEmployee
};
