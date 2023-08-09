const pool = require('../../databaseconnection')

function serviceboking(data, callback) {
  const placeholders = data.ser_name_slno.map(() => '?').join(','); // Create placeholders for array values
  const values = [
      data.user_id,
      ...data.ser_name_slno,
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
      data.serv_image_driveway
  ];

  const sql = `
      INSERT INTO service_reg
      SET
          user_id = ?,
          ser_name_slno IN (${placeholders}), 
          serv_type_slno = ?,
          serv_time = ?,
          serv_date = ?,
          serv_location = ?,
          vehicle_id = ?,
          vehicle_name = ?,
          serv_image_stain = ?,
          serv_image_sofa = ?,
          serv_image_carpet = ?,
          serv_image_window = ?,
          serv_image_gutter = ?,
          serv_image_driveway = ?
  `;

  pool.query(sql, values, (error, results) => {
      if (error) {
          console.error(error);
          return callback(error);
      }
      return callback(null, message);
  });

  console.log(`values ${values}`);
}

module.exports = {
  serviceboking,
};

