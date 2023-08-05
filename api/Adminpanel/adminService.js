const pool = require('../../databaseconnection');

function adminlogin(data,callback){
    pool.query(`SELECT admin_name,ad_slno,app_user FROM admin_creation WHERE admin_email=? and admin_password=?`,
    [datadata.admin_email, data.admin_password],(err,results)=>{
        if(err){
            return callback(err)
        }
        else {
            return callback(null,results)
        }
    }
    )
};

module.exports={
    adminlogin
}