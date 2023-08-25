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

function checkIfupdateEmailExists(data, callback) {
  pool.query('SELECT emp_id FROM emp_creation WHERE emp_email = ? AND emp_id != ?',  
  [data.email, data.emp_id],
   (err, results) => {
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
  pool.query(`UPDATE emp_creation SET ? WHERE emp_id =?`, [data,data.emp_id], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      console.log(err);
      callback('internal server error');
    } else {
      console.log('employee details updated');
      callback(null, 'profile updated successfully');
    }
  });
}


module.exports = {
  checkIfEmailExists,
  insertEmployee,
  updateEmployee,
  checkIfupdateEmailExists
};
