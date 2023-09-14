
const pool = require('../../databaseconnection')

module.exports = {

  ServiceRegistartionselect: (id,callback) => {
    pool.query(

          `SELECT 
          service_reg.user_id,
          CONCAT(user_creation.user_fname, ' ', user_creation.user_lname) AS customer_Name,
          service_reg.ser_name_slno,
         service_name.service_name,
          service_reg.serv_type_slno,
          service_type.service_type, 
          service_reg.serv_image_stain, 
          service_reg.serv_image_sofa, 
          service_reg.serv_image_carpet, 
          service_reg.serv_image_window ,
          service_reg.serv_image_gutter, 
          service_reg.serv_image_driveway, 
          service_reg.serv_time, 
          service_reg.serv_date, 
          service_reg.serv_location ,
          vehicle_name,
          vehicle_id
        FROM service_reg 
        LEFT JOIN service_type ON service_reg.serv_type_slno = service_type.type_slno 
        LEFT JOIN service_name ON FIND_IN_SET(service_name.name_slno, REPLACE(service_reg.ser_name_slno, ' ', '')) > 0
        LEFT JOIN user_creation ON service_reg.user_id = user_creation.id 
        WHERE user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  serviceAccept:(data,callback)=>{
    pool.query(`
    INSERT INTO service_acceptance(service_acceptance, service_id, emp_id) 
    VALUES (?,?,?)
    `,[
      data.service_acceptance,
      data.service_id,
      data.emp_id 
    ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
      )
  }
};
