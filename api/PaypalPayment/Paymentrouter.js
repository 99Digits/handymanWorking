const express = require('express');
const router = express.Router();


const paypal = require('paypal-rest-sdk');
const query = require('querystring')


paypal.configure ({
    mode:'sandbox',
    client_id:process.env.PAYPAL_CLIENT_KEY,
    secret_id:process.env.PAYPAL_SECRET_KEY

})


 


    router.get('/paypalpayment',async(req,res)=>{
        const amount = req.query.amount;
        const currency =  req.query.currency.toUpperCase();
        
    const create_payal_payment ={
        "intent":'sale',
        "payer":{
            "payment_method":'paypal'
        },
        "redirect_url" : {
            "return_url" :`http://143.198.103.241:5000/execute?amount = ${amount}`,
            "cancel_url" : 'http://cancel_url'
        },
      "transaction":[
        {
            "item_list":{
                "items":[{
                    "name":"item",
                    "sku":"item",
                    "price":amount,
                    "currency":currency,
                    "quantity":1
                }]
            },

            "amount": {
                "currency":currency,
                "total":amount
            },
            "description":"this is the payment description"

        }]

        
    };

    paypal.payment.create(create_payal_payment,function(error,payment){
        if(error){
            console.log(error);
            throw error;
        }
        else {
            console.log('create paypal payment');
            console.log(payment);
            for(var index = 0; index < payment.links.length ; index ++){
                if(payment.links(index).rel === 'approval'){
                    res.redirect(payment.links[index].href);
                }
            }
        }
    })


    })





    

    router.get('/execute',async(req,res)=>{
        var execute_payment_json ={
            "payer_id":req.query.payer_id,
            "transaction":[{
                "amount":{
                    "currency":"USD",
                    "total":'1.11'
                }
            }]
        }

        const paymentId = req.query.paymentId;
        paypal.payment.execute(paymentId,execute_payment_json,function(error,payment){
            if(error){
                console.log(error);
                throw error;
            }
            else{
                console.log(JSON.stringify(payment));
                res.redirect("http://return/?status =success&id="+payment.id + "&state=" + payment.state)
            }


        })
        
        
    })


   

  



module.exports = router;