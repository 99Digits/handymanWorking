// import multer  from 'multer';
// import path from 'path';
require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
// const mysql = require("mysql");
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
const Jobmangement = require('./api/employeeJobMangement/JobMangemnt.router')
const notifyRouter = require('./api/Notification/Notification.router');
const subscrptionRouter= require('./api/ServiceSubcription/subscription.router')
const employee = require('./api/Employee/Employeerouter')
const userloginrouter = require('./api/usercreation/usercreation.router')
//  const otpverification = require('./api/verification/otpverification.router')

app.get('/',(req,res)=>{
    res.send("hello my name is")
})

app.use('/api/user',usercreationRouter)
app.use('/api/getservicetype',servicetypeRouter)
app.use('/api/servReg',serviceRegisterRouter)
app.use('/api/employee',EmployeeCreationRouter)
app.use('/api/jobmangmt',Jobmangement)
app.use('/api/notify',notifyRouter)
app.use('/api/sebcrption',subscrptionRouter)
app.use('/api/employee',employee)
app.use('/api/userlogin',userloginrouter)


const PORT = process.env.PORT ||5000


app.listen(PORT,()=>{
     console.log(`server is running port ${PORT}`);
    
})

