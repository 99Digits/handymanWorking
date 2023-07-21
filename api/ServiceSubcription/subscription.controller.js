const {selectSubscrptionService}  = require('./subsrciption.service')


module.exports= {
    selectSubscrptionService:(req,res)=>{
        const id = req.params.id;
        selectSubscrptionService(id,(err,results)=>{
            console.log(results);
            if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"You have no subscription"
                })
            }
            return res.status(200).json({
                success:2,
                // message:"Glossy flossy worker available on this location",
                data:results
            })
        })
    }
}