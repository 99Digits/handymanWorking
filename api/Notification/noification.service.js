// const pool = require('../../databaseconnection')


// module.exports={
//     checkEmpAvailbility:(data,callback) =>{

//         pool.query(`select emp_firstname,emp_id 
//         from emp_creation 
//         where emp_location = ? `,
//         [data.emp_location],
//         (error, results, feilds) => {
//             if (error) {
//               return callback(error);
//             }
//             return callback(null, results);
//           }
//         )
//     },
//     getAssistanceMessge:(callback)=>{
//       pool.query(`SELECT 	email,phone,messge
//        FROM assistance_msg`,[],
//        (error, results, feilds) => {
//         if (error) {
//           return callback(error);
//         }
//         return callback(null, results);
//       }
        
//       )
//     }
  
// }

const { json } = require('express');
const {ONE_SIGNAL_CONFIG} = require('./onesignal_config')

async function SendNotification(data,callback){
var headers ={
  "Content-Type" : "application/json; Charset=utf-8",
  "Authorization" :"Basic" + ONE_SIGNAL_CONFIG.API_KEY,  
};

var options = {
  host: "onesignal.com",
  port:443,
  path:'/api/v1/noifications',
  method:'POST',
  headers:headers
}
  var https = require("https")
  var req = https.request(options,function(res){
    res.on("data",function(data){
      console.log(json.parse(data));
      return callback(null,json.parse(data))
    })

  });

  req.on("error",function(e){
    return callback({
      mesaage:e,

    })

  })
  req.write(json.stringify(data));
  req.end()
}

module.exports = {
  SendNotification
}
