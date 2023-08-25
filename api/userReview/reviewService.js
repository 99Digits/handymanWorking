const pool = require('../../databaseconnection')


function addReview(data,callback){
pool.query(`INSERT INTO user_review SET ?
`,data,(err,results) =>{
    if(err){
        callback('internal server error')
    }
    else {
        callback("Thank for your review")
    }

})
}


module.exports={
    addReview
}
