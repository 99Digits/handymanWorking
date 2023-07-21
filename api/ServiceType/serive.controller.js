const  {getserviceType,getservicename,getservicesubcription,getrequirement} =require('./serviceType.service');


module.exports ={
    getserviceType:(req,res)=>{
        getserviceType((err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"no records"
                })
            }
            return res.status(200).json({
                success:2,
                data:results
            })
        })
      },
      getservicename:(req,res)=>{
        const id = req.params.id;
        getservicename(id,(err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"no records"
                })
            }
            return res.status(200).json({
                success:2,
                data:results
            })
        })
      },
      getservicesubcription:(req,res)=>{
        const id = req.params.id;
        getservicesubcription(id,(err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"no records"
                })
            }
            return res.status(200).json({
                success:2,
                data:results
            })
        })
      },
      getrequirement:(req,res)=>{
        getrequirement((err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"no records"
                })
            }
            return res.status(200).json({
                success:2,
                data:results
            })
        })
      },
}

