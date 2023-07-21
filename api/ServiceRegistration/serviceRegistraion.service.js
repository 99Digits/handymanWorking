


// const mysql = require("mysql");
// const pool = mysql.createConnection({
//   host:process.env.host,
//   user:process.env.username,
//   password:process.env.password,
//   database:process.env.DATABASE,
// });
// const pool = require('../.././databaseconnection 2')
const filename = require('./serviceRegistration.router')

module.exports = {
  // insertservicereg: (data, callback) => {
  //   pool.query(
  //     `INSERT INTO service_reg 
  //     (user_id, ser_name_slno, serv_type_slno,serv_image,serv_time,serv_date,	serv_location,vehicle_id,vehicle_name)
  //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  //     [
  //       data.user_id,
  //       data.ser_name_slno,
  //       data.serv_type_slno,
  //       data.serv_image,
  //       data.serv_time,
  //       data.serv_date,
  //       data.serv_location,
  //       data.vehicle_id,
  //       data.vehicle_name
        
  //     ],
  //     (error, results, fields) => {
  //       if (error) {
  //         return callback(error);
  //       }
  //       return callback(null, results);
  //     }
  //   );
  // },


  insertservicereg: (data, callback) => {
    let servImagessofa = data.file.filename; // Array of sofa image data
    let servimagestain = data.serv_image_stain // aray of satin removal image data
    let servImageWindow = data.serv_image_window // array of window cleaning image data
    let servImageGuttering = data.serv_image_guttering // array of guttering wash image data
   let servImageDriveWay = data.serv_image_driveway // array of driveway pressure wash image data
       let serNameSlnoArray  = data.ser_name_slno; // array of service name
   console.log(serNameSlnoArray);
   if (!Array.isArray(serNameSlnoArray)) {
    serNameSlnoArray = [serNameSlnoArray];
  }
  if (!Array.isArray(servImagessofa)) {
    // If servImages is not an array or is undefined, set it to an empty array
    servImagessofa = [];
  }
  if (!Array.isArray(servimagestain)) {
    // If servImages is not an array or is undefined, set it to an empty array
    servimagestain = [];
  }
  if (!Array.isArray(servImageWindow)) {
    // If servImages is not an array or is undefined, set it to an empty array
    servImageWindow = [];
  }
  if (!Array.isArray(servImageDriveWay)) {
    // If servImages is not an array or is undefined, set it to an empty array
    servImageDriveWay = [];
  }
  if (!Array.isArray(servImageGuttering)) {
    // If servImages is not an array or is undefined, set it to an empty array
    servImageGuttering = [];
  }
   const flattenedImages = servImagessofa.map((imageUrl) => imageUrl).join(',');
   const serNameSlnoString  = serNameSlnoArray .join(',');
   const stainremoval = servimagestain.map((imageUrl) => imageUrl).join(',');
   const windowimage = servImageWindow.map((imageUrl) => imageUrl).join(',');
   const gutteringImage = servImageGuttering.map((imageUrl) => imageUrl).join(',');
   const drivawayImage = servImageDriveWay.map((imageUrl) => imageUrl).join(',')


    const query = `INSERT INTO service_reg 
  (user_id, ser_name_slno, serv_type_slno, 	
  serv_image_sofa,serv_time, serv_date, serv_location, vehicle_id, vehicle_name,
  serv_image_stain,serv_image_window,serv_image_guttering,serv_image_driveway)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


  const values = [
    data.user_id,
    serNameSlnoString,
    data.serv_type_slno,
    flattenedImages,
    data.serv_time,
    data.serv_date,
    data.serv_location,
    data.vehicle_id,
    data.vehicle_name,
    stainremoval,
    windowimage,
    gutteringImage,
    drivawayImage

  ];
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  

  serviceUpdation: (data, callback) => {
    pool.query(
      `UPDATE service_reg SET 
      user_id = ?, ser_name_slno = ?, serv_type_slno = ?, serv_image = ?, serv_time = ?, serv_date = ?,
      serv_location = ?,vehicle_id = ?,vehicle_name = ?
      WHERE reg_slno = ?`,
      [
        data.user_id,
        data.ser_name_slno,
        data.serv_type_slno,
        data.serv_image,
        data.serv_time,
        data.serv_date,
        data.serv_location,
        data.vehicle_id,
        data.vehicle_name,
        data.reg_slno,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  ServiceRegistartionselect: (id,callback) => {
    pool.query(

          `SELECT 
          service_reg.user_id,
          CONCAT(user_creation.user_fname,' ',user_creation.user_lname) AS customer_Name,
            service_reg.ser_name_slno, service_name.service_name,
            service_reg.serv_type_slno,
            service_type.service_type, 
            service_reg.serv_image, 
            service_reg.serv_time, 
            service_reg.serv_date, 
            service_reg.serv_location 
            FROM service_reg 
            LEFT JOIN service_type ON service_reg.serv_type_slno = service_type.type_slno 
            LEFT JOIN service_name ON service_reg.ser_name_slno = service_name.name_slno 
            LEFT JOIN user_creation ON service_reg.user_id = user_creation.id 
            WHERE id = ?; `,

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
