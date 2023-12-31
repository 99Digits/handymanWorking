
const pool = require('../../databaseconnection')


module.exports = {
 

 getEmpDetails : (id, callback) => {
    pool.query(
      `SELECT CONCAT(emp_firstname,' ',emp_lastname) as emp_name,
      emp_firstname,
      emp_lastname,
      emp_phone,
      emp_address,
      emp_location,
      emp_profile_pic,
      emp_email,
      isuence_id,
      trining_course,
      work_avl_to,
      WorkAvl_from,
      experience FROM emp_creation WHERE emp_id=?`,
      [id],
      (error, modifiedResults, fields) => {
        if (error) {
          return callback(error);
        }
  
  
        return callback(null, modifiedResults);
      }
    );
  },

 Empupdation: (data, callback) => {
    pool.query(
      `UPDATE emp_creation SET
      emp_firstname = ?,
      emp_lastname = ?,
      emp_phone = ?,
       emp_address = ?,
       emp_location = ? ,
       WorkAvl_from = ?,
       work_avl_to = ?,
      experience = ?, 
      isuence_id = ?, 
      trining_course =?,
       emp_email =?,
       emp_password =?,
      emp_profile_pic =?,,
      app_user=? 
      WHERE emp_id = ?
      `,
      [
        data.emp_firstname,
        data.emp_lastname,
        data.emp_phone,
        data.emp_address,
        data.emp_location,
        data.WorkAvl_from,
        data.work_avl_to,
        data.experience,
        data.isuence_id,
        data.trining_course,
        data.emp_email,
        data.emp_password,
        data.emp_profile_pic,
        data.app_user, 
        data.emp_id
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  
  getempLogin:(data,callback)=>{
    pool.query(`SELECT emp_id,emp_firstname,emp_lastname,app_user FROM emp_creation WHERE emp_email =? and emp_password =?`,
    [data.emp_email,
    data.emp_password],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
    )
  },
  getregistredEmail:(id,callback) =>{
    pool.query(`SELECT emp_email FROM emp_creation WHERE emp_email = ?`,[id],
    (error, results, fields) => {
      // console.log(results);
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
    )
  },
};
