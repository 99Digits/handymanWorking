const pool = require('../../databaseconnection')


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
