const mysql = require("mysql");
var pool = mysql.createConnection({
  host:'192.168.1.3',
  user:"myhostname",
  password:"",
  database:'handyman',
});




// var pool = mysql.createConnection({
//   host:'localhost',
//   user:"root",
//   password:"",
//   database:'handyman',
//   timezone: '+0800',
//   connectionLimit: 10 ,
//   connectTimeout: 10000,
//   waitForConnections: true,
//   queueLimit: 0 
// });

// pool.getConnection(function(err, connection) {
//   connection.query( 'SELECT something FROM sometable', function(err, rows) {

//     console.log(pool._freeConnections.indexOf(connection)); // -1

//     connection.release();

//     console.log(pool._freeConnections.indexOf(connection)); // 0

//  });
// });



// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'localhost',
//   user            : 'root',
//   password        : 'handyman'
// });

// pool.getConnection(function(err, connection) {
//     connection.query( 'SELECT something FROM sometable', function(err, rows) {

//       console.log(pool._freeConnections.indexOf(connection)); // -1

//       connection.release();

//       console.log(pool._freeConnections.indexOf(connection)); // 0

//    });
// });


// connection.connect((err) => {
//   if (err) {
//       console.error('Error connecting to the database: ', err);
//       return;
//   }
//   console.log('Connected to the database.');
// });

module.exports={
    checkEmpAvailbility:(data,callback) =>{

        pool.query(`select emp_firstname,emp_id 
        from emp_creation 
        where emp_location = ? `,
        [data.emp_location],
        (error, results, feilds) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        )
    },
    getAssistanceMessge:(callback)=>{
      pool.query(`SELECT 	email,phone,messge
       FROM assistance_msg`,[],
       (error, results, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
        
      )
    }
  
}
