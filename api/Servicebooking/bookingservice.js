const pool = require('../../databaseconnection')

function serviceboking(data, callback) {
 pool.query(`INSERT INTO service_reg SET ?
 `,[data],
 (error,results)=>{
  if(error){
    return callback(error)
  }
  else{
    retu
  }
 }
 )
  

pool.query(sql, [data], (error, results) => {
  console.log(data);
  
  if (error) {
    return callback(error);
  }
  else {
    return callback(null, "booked succesfully");
  }
  
});

  // console.log(`values ${values}`);
}

module.exports = {
  serviceboking,
};

