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
        callback(null, 'new user registered successfully');
      }
    });
  }

  function Updateuser(data,callback){
    pool.query(`UPDATE user_creation SET ? WHERE id =?`,[data,data.id],(err,results)=>{
      console.log(data);
      if(err){
        callback('internal server error')
      }
      else{
        callback(null,"profile updated successfully")
      }
    })
  }
  
  module.exports = {
    checkIfEmailExists,
    insertuser,
    Updateuser
  }