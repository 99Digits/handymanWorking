const express = require('express');
const router = express.Router();


const paypal = require('paypal-rest-sdk');
// const queryString = require("query-string");

import('query-string').then((queryString) => {
    // Now you can use queryString here
}).catch((error) => {
    console.error("Error importing query-string:", error);
});


// const axios = require('axios');

// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;

// // PayPal token endpoint for the sandbox environment
// const tokenEndpoint = 'https://api.sandbox.paypal.com/v1/oauth2/token';

// const data = 'grant_type=client_credentials';

// const config = {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   auth: {
//     username: clientId,
//     password: clientSecret,
//   },
// };

// axios
//   .post(tokenEndpoint, data, config)
//   .then((response) => {
//     const accessToken = response.data.access_token;
//     console.log('Access Token:', accessToken);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

// //   const axios = require('axios');

//   const accessToken = 'A21AAInUGDcuGoEZyX2BofQmpyhSp6qFeeOIGl6RsqBYZSttRVefx32dcjH5-sSOTUITYoZ6Gyuwyfsw61W5IMO_FvxJdNtpg';
  
//   const config1 = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type': 'application/json',
//     },
//   };
  
//   // Make PayPal API requests using the access token in the headers
//   axios
//     .get('https://api.sandbox.paypal.com/v2/some/paypal/endpoint', config1)
//     .then((response) => {
//         res.status(400).json({success:response.data})
//     //   console.log('API Response:', response.data);
//     })
//     .catch((error) => {
//       console.error('API Error:', error);
//     });
  

paypal.configure({
    mode: process.env.PAYPAL_MODE,
    CLIENT_ID:process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET
});

router.get('/createpaypalpayment', async (req, res) => {

    console.log(req.query);

    const amount = req.query.amount;
    const currency = req.query.currency;
    console.log(amount);
    console.log(currency);

    
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://return.url",
            "cancel_url": "http://cancel.url"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        console.log(payment);
        if (error) {
            res.status(500).json({ error: 'Payment creation failed' });
            console.log(error);
            //  throw error;
        } else {
            res.status(200).json({message:'payment successfull'})
            console.log("Create Payment Response");
          
        }
    });
    // var create_payment_json = {
    //     "intent": "sale",
    //     "payer": {
    //         "payment_method": "paypal"
    //     },
    //     /// Return url which will be executed once the intent is created.
    //     /// "https://us-central1-paypal.cloudfunctions.net/paypalTestPaymentExecute",
    //     /// 
    //     "redirect_urls": {
    //         "return_url": `http://localhost:5000/createpaypalpayment?amount=${amount}&currency=${currency}`,
    //         "cancel_url": "http://cancel.url"
    //     },
    //     "transactions": [{
    //         "item_list": {
    //             "items": [{
    //                 "name": "item",
    //                 "sku": "item",
    //                 "price": amount,
    //                 "currency": currency,
    //                 "quantity": 1
    //             }]
    //         },
    //         "amount": {
    //             "currency": currency,
    //             "total": amount
    //         },
    //         "description": "This is the payment description."
    //     }]
    // };
    // paypal.payment.create(create_payment_json, function (error, payment) {
    //     if (error) {
    //         res.status(500).json({ error: 'Payment creation failed' });
    //         console.error(error);
            
            
    //     } else {
    //         res.status(200).json({message:'payment successfull'})
    //         console.log('create payment response');
    //         console.log(payment);
    //         for (var index = 0; index < payment.links.length; index++) {
    //             if (payment.links[index].rel === 'approval_url') {
    //                 res.json({ approval_url: payment.links[index].href });
    //             }
    //         }
    //     }
    // });





  
    
});

router.get('/execute', async (req, res) => {
    const amount = req.query.amount;
    const currency = req.query.currency;

    var execute_payment_json = {
        "payer_id": req.query.PayerID,
        "transactions": [{
            "amount": {
                "currency": currency,
                "total": amount
            }
        }]
    };
    const paymentId = req.query.paymentId;
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.status(400).json({
                error:"payment authentication failed"
            })
            console.log(error);
            // throw error;
        } else {

            console.log(JSON.stringify(payment));
            res.status(200).json({success:"payment successfully"})
            res.redirect("http://return_url/?status=success&id=" + payment.id + "&state=" + payment.state);
        }
    });








});
  



module.exports = router;