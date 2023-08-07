const pool = require('../../databaseconnection')


function jobcompletion(data,callback){
    pool.query(`INSERT INTO empjob_mangemnt SET ?`,data,(err,results)=>{
        if(err){
            return callback(err)
        }
        else{
            return callback(null,"job details added")
        }
    })
}

module.exports={
    jobcompletion
}