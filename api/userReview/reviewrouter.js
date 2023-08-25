

const express = require('express');
const router = express.Router();
const reviewservice = require('./reviewService');



function userreview(req, res){
    const {review,user_id} = req.body

    const data ={review,user_id}
 
    reviewservice.addReview(data,(err,message)=>{
        if(err){
            return res.status(500).json({error:err})
        }
        else{
            res.json({success:2,message})
        }
    })
}


router.post('/add',userreview)

module.exports = router;