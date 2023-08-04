const pool = require('../../databaseconnection')

function serviceboking(data, callback) {
    pool.query(`INSERT INTO service_reg SET ?`, data, (err, results) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, "service booking successfully");
      }
    });
  }
  
  module.exports = {
    serviceboking,
  };
  
