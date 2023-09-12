const pool = require('../../databaseconnection')

function serviceboking(data, callback) {
 pool.query(`INSERT INTO service_reg 
 (user_id,
  ser_name_slno,
  serv_type_slno,
  serv_time,
  serv_date,
  serv_location,
  vehicle_id,
  vehicle_name,
  serv_image_stain,
  serv_image_sofa,
  serv_image_carpet,
  serv_image_window,
  serv_image_gutter,
  serv_image_driveway) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  [data.user_id,
  data.parsearray,
  data.serv_type_slno,
  data.serv_time,
  data.serv_date,
  data.serv_location,
  data.vehicle_id,
  data.vehicle_name,
  data.serv_image_stain,
  data.serv_image_sofa,
  data.serv_image_carpet,
  data.serv_image_window,
  data.serv_image_gutter,
  data.serv_image_driveway],

(error, results, fields) => {

  if (error) {
    return callback(error);
  }
  return callback(null, "service booked successfully");
}
 )
}

module.exports = {
  serviceboking
};

