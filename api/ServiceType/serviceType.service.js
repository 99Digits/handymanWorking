const pool = require('../../databaseconnection')


module.exports={
    getserviceType:(callback)=>{
        pool.query(`select * from service_type`,
        [],
        (error,results,feilds)=>{
            if(error){
              return callback(error)
            }
            return callback(null,results);
          } 
          )
      },

      getservicename:(id,callback)=>{
        pool.query(`select name_slno,service_name
         from service_name where serv_type_slno=?`,
        [id],
        (error,results,feilds)=>{
            if(error){
              return callback(error)
            }
            return callback(null,results);
          }
        )
      },

      getservicesubcription :(id,callback)=>{
        pool.query(`select * from serv_subscription where serv_type_slno =?`,
        [id],
        (error,results,feilds)=>{
          if(error){
            return callback(error)
          }
          return callback(null,results);
        } 
        )
      },
      getrequirement:(callback)=>{
        pool.query(`select * from requirement`,[],
        (error,results,feilds)=>{
          if(error){
            return callback(error)
          }
          return callback(null,results)
        }
        )
      },

}