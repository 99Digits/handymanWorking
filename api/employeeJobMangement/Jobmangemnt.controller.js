const {EmpJobMangment,updateEmpJobMangemnt,workerserviceHistory} = require('./Jobmanagemnet.service')


module.exports={
    EmpJobMangment:(req,res)=>{
        const body=req.body;
        EmpJobMangment(body,(err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    message:"server is not responding"
                })
            }
            return res.status(200).json({
                success:2,
                message:"your Job complted succesfully"
            })
        })
      },
      updateEmpJobMangemnt:(req,res)=>{
        const body=req.body;
        updateEmpJobMangemnt(body,(err,results)=>{
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
                message:"job complted successfully"
            })
        })
      },
      workerserviceHistory:(req,res)=>{
        const id=req.params.id;
        workerserviceHistory(id,(err,results)=>{
              if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(500).json({
                    success:1,
                    message:"server is not responding"
                })
            }
            return res.status(200).json({
                success:2,
                message:results
            })
        })
      },
}