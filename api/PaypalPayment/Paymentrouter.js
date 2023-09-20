const express = require('express');
const router = express.Router();


const paypal = require('paypal-rest-sdk');


paypal.configure ({
    mode:'sandbox',
    client_id:'AbfcGFFcHzt8hPFXQHpRsyL82WyKJ_a2Hg90O08-dPb26ICWfY-aTZSEZyBT7YH_Mn3Oco1eYF82nqB2',
    secret_id:'EPy9TfKifvZYAbVKV_M25rclTsu3HV7UOQHIdkXJlp_OWel9UAWaFxzDBO_jRxWTZ-0mPquAhofp-Ynj'

})
router.post ('/createPayment',async(req,res)=>{

    const amount = req.query.amount;
    const currency =  req.query.currency.toUpperCase();

    const paymentData ={
        "intent":'sale',
        "payer":{
            "payment_method":'paypal'
        },
        "redirect_url" : {
            "return_url" :'',
            "cancel_url" : ''
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


    paypal.payment.create(paymentData,function(error,payment){
        if(error){
            console.log(error);
            throw error;
    
        }else {
            for(var index = 0; index < payment.links.length ; index ++){
                if(payment.links(index).rel === 'approval'){
                    res.redirect(payment.links[index].href);
                }
            }
        }
    });

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
        
        paypal.payment.execute(paymentId,execute_payment_json,function(error,payment){
            if(err){
                console.log(err);
            } else{
                console.log(JSON.stringify(payment));
                const paymentId =req.query.paymentId;
                res.redirect("http://return/?status =success&id="+payment.id + "&state=" + payment.state)
            }
        })
    })


    try{
        const payment = await paypal.payment.create(paymentData)
        res.redirect(payment.links[1].href)

    }

    catch (error){
        res.status(500).json({error:"payment cancelled"})
    }

    // router.get('/success',(req,res)=>{
    //     res.send(200).json({message:"payment successfully"})
    // })

    // router.get('/cancel',(req,res)=>{
    //     res.send(400).json({message:"payment cancelled"})
    // })

})


module.exports = router;