// import multer  from 'multer';
// import path from 'path';
require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors')
const {initializeApp,applicationDefault } = require('firebase-admin/app')
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app); // Create an instance of http.Server using Express
const io = socketIO(server); // Pass the http.Server instance to Socket.IO

io.on('connection', (socket) => {
  console.log('A user connected',socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('message',(data)=>{
    console.log(data);
    socket.broadcast.emit('message-receive',data)
  });
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const usercreationRouter  = require('./api/User/UserRouter');
const servicetypeRouter = require('./api/ServiceType/service.router');
const serviceRegisterRouter = require('./api/ServiceRegistration/serviceRegistration.router')
const EmployeeCreationRouter = require('./api/EmployeeeCreation/employeecreation.router')
const empJobmangement = require('./api/employeeJobMangement/JobMangemnt.router')
const notifyRouter = require('./api/Notification/Notification.router');
const subscrptionRouter= require('./api/ServiceSubcription/subscription.router')
const employee = require('./api/Employee/Employeerouter')
const userloginrouter = require('./api/usercreation/usercreation.router')
const booking = require('./api/Servicebooking/bookingrouter')
const adminlogin = require('./api/Adminpanel/adminrouter')
const Jobmangement = require('./api/JobManagement/JobMangementrouter')
const notification = require('./api/AppNotification/appnotification.router')
  const otpverification = require('./api/verification/otpverification')
const userreviewRouter =require('./api/userReview/reviewrouter')
app.get('/',(req,res)=>{
    res.send("hello my name is")
})
app.use(express.static(__dirname+'/upload'))
app.use('/api/user',usercreationRouter)
app.use('/api/getservicetype',servicetypeRouter)
app.use('/api/servReg',serviceRegisterRouter)
app.use('/api/employee',EmployeeCreationRouter)
app.use('/api/jobmangmt',empJobmangement)
app.use('/api/notify',notifyRouter)
app.use('/api/sebcrption',subscrptionRouter)
app.use('/api/employee',employee)
app.use('/api/userlogin',userloginrouter)
app.use('/api/service',booking)
app.use('/api/admin',adminlogin)
app.use('/api/job',Jobmangement)
app.use('/api/notification',notification)
app.use('/api/review',userreviewRouter)

app.use('/api/otp',otpverification)

// var admin = require("firebase-admin");
// const {getMessaging} = require("firebase-admin/messaging")


// process.env.GOOGLE_APPLICATION_CREDENTIALS;

// app.use(function(req,res,next){
// res.setHeader("Content-type","application/json");
// next();
// })
  

// app.post("/send",(req,res)=>{
//   const receivedToken = req.body.fcmToken
//   const message ={
//      notification:{
//       title:"notif",
//       body:"this is a notofication"
//     },
//     token:receivedToken
//   };
  
// })

// getMessaging()
// .send(message)
// .then((response)=>{

// })

// initializeApp({
//   credential:applicationDefault(),
//   projectId:'glossy-flossy-otp'
// });





const PORT = process.env.PORT ||5000


app.listen(PORT,()=>{
     console.log(`server is running port ${PORT}`);
    
})

