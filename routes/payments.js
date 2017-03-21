var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var dotenv = require('dotenv');
dotenv.load();      //get configuration file from .env

var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var slackMessenger = require('../services/slack_messenger');

//collector donated money -- worked through stripe
router.post('/', function(req,res){

  var token_id = req.body.token_id;
  var purchase_price = Math.floor(req.body.price); //take care of the "awesome" Javascipt math

  //console.log(token_id +"\n"+ purchase_price  +"\n"+ process.env.STRIPE_SECRET_KEY );

  var charge = stripe.charges.create({
    amount: purchase_price, // Amount in cents
    currency: "usd",
    source: token_id,
    description: "Donation to Infinite Industries"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      res.json({"status":"failure", "reason":"card was declined"});
    }
    else{
      console.log(charge);
      res.json({"status":"success"});
    }
  });
})

router.get('/success', function(req,res){
  res.render('success-payment',{domain: process.env.DOMAIN});
})

router.get('/failure', function(req,res){
  res.render('error',{domain: process.env.DOMAIN});
})

//webhook from Stripe - data on successfull charge of card
      //slackMessenger.newOrder(contact_data);

module.exports = router;
