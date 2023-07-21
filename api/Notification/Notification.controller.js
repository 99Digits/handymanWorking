const {checkEmpAvailbility,getAssistanceMessge} = require('./noification.service');

module.exports ={
    checkEmpAvailbility:(req,res)=>{
        const body = req.body;
        checkEmpAvailbility(body,(err,results)=>{
            if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"no employee under this selected location"
                })
            }
            return res.status(200).json({
                success:2,
                message:"Glossy flossy worker available on this location",
                data:results
            })
        })
    },
    getAssistanceMessge:(req,res)=>{
        getAssistanceMessge((err,results)=>{
            if(err){
                return res.status(400).json({
                    error:"error occured",
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    // message:"no employee under this selected location"
                })
            }
            return res.status(200).json({
                success:2,
                // message:"Glossy flossy worker available on this location",
                data:results
            })
        })
    },
}