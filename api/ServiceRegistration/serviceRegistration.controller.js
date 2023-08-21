const {insertservicereg,serviceUpdation,ServiceRegistartionselect,serviceAccept} = require('./serviceRegistraion.service')
const multer = require('multer')
const filename = require('./serviceRegistration.router')
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, './upload');
    },
    filename: (req, file, callback) => {
    const filename = `image${Date.now()},${file.originalname}`;
     callback(null, filename);
    }
     });

     const upload = multer({
        storage: storage,
     //  fileFilter: fileFilter,
       });
module.exports={
  
      serviceupdation:(req,res)=>{
        const body=req.body;
        serviceUpdation(body,(err,results)=>{
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
                message:"servicess updated succesfully"
            })
        })
      },
      ServiceRegistartionselect:(req,res)=>{
        const id = req.params.id;
        ServiceRegistartionselect(id,(err,results)=>{
              if(err){
                return res.status(400).json({
                    success:0,
                    message:err
                })
            }
            else if(results.length==0){
                return res.status(200).json({
                    success:1,
                    data:[]
                })
            }
            return res.status(200).json({
                success:2,
                data:results
            })
        })
      },
      serviceAccept:(req,res)=>{
        const body=req.body;
        serviceAccept(body,(err,results)=>{
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
                message:"Accepted"
            })
        })
      },
}
