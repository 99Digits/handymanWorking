// const {checkEmpAvailbility,getAssistanceMessge} = require('./noification.service');

// module.exports ={
//     checkEmpAvailbility:(req,res)=>{
//         const body = req.body;
//         checkEmpAvailbility(body,(err,results)=>{
//             if(err){
//                 return res.status(400).json({
//                     success:0,
//                     message:err
//                 })
//             }
//             else if(results.length==0){
//                 return res.status(200).json({
//                     success:1,
//                     message:"no employee under this selected location"
//                 })
//             }
//             return res.status(200).json({
//                 success:2,
//                 message:"Glossy flossy worker available on this location",
//                 data:results
//             })
//         })
//     },
//     getAssistanceMessge:(req,res)=>{
//         getAssistanceMessge((err,results)=>{
//             if(err){
//                 return res.status(400).json({
//                     error:"error occured",
//                     message:err
//                 })
//             }
//             else if(results.length==0){
//                 return res.status(200).json({
//                     success:1,
//                     // message:"no employee under this selected location"
//                 })
//             }
//             return res.status(200).json({
//                 success:2,
//                 // message:"Glossy flossy worker available on this location",
//                 data:results
//             })
//         })
//     },
// }


const {ONE_SIGNAL_CONFIG} = require('./onesignal_config')
const Notification = require('./noification.service')

exports.sendpushNotification = (req,res,next)=>{
    var message ={
        app_id : ONE_SIGNAL_CONFIG.API_KEY,
        contents:{"en":"test notification "},
        included_segments:["All"],
        content_available :true,
        small_icon : "ic_notification_icon",
        data:{
            PushTitle:"Custom notification",

        }
    }

     Notification.SendNotification(message,(error,results)=>{
        if(error){
            return next(error)
       }
       return res.status(400).send({
        message:"success",
        data:results
       })
    })
}

