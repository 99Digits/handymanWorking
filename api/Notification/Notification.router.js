// const router = require("express").Router();
// const {checkEmpAvailbility,getAssistanceMessge} = require('./Notification.controller')

// router.post('/loc',checkEmpAvailbility)
// router.get('/msg',getAssistanceMessge)



// const OneSignal = require('onesignal-node');


// // Create a new OneSignal client with your API key and App ID
// const client = new OneSignal.Client({
//   userAuthKey: '',
//   app: { appAuthKey: 'YOUR_ONESIGNAL_APP_AUTH_KEY', appId:  },
// });

// // Define the notification content
// const notification = {
//     contents: { en: 'Notification Content' },
//     headings: { en: 'Notification Title' },
//     included_segments: ['All'], // Send to all subscribers
//   };

// // Send the notification
// client.createNotification(notification).then(response => {
//     console.log('OneSignal notification sent successfully:', response.body);
//   }).catch(error => {
//     console.error('Error sending OneSignal notification:', error);
//   });



// module.exports = router;

const notificationcontroll = require('./Notification.controller')

const express = require('express')
const router = express.Router()

router.get('/get',notificationcontroll.sendpushNotification)

module.exports =router;