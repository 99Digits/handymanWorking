

const express = require('express');
const router = express.Router();

router.post('/send', (req, res) => {
    const notification = {
        'title': 'Title of notification',
        'text': 'Subtitle'
    };

    const fcm_tokens = [];

    const notification_body = {
        'notification': notification,
        'registration_ids': fcm_tokens
    };

    import('node-fetch').then((module) => {
        const fetch = module.default;

        fetch('https://fcm.googleapis.com/fcm/send', {
            "method": "POST",
            'headers': {
                'Authorization': 'key=YOUR_FCM_SERVER_KEY',
                'Content-Type': 'application/json' // Fixed typo here
            },
            'body': JSON.stringify(notification_body)
        }).then(() => {
            res.status(200).send('Notification sent successfully');
        }).catch((err) => {
            res.status(400).send('Something went wrong');
        });
    }).catch((error) => {
        console.error('Error while importing node-fetch:', error);
        res.status(500).send('Internal server error');
    });
});

module.exports = router;
