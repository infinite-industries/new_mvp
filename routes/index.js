var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var dotenv = require('dotenv');
dotenv.load();      //get configuration file from .env

//collector contacted I.I for work availability
router.post('/direct-contact', function(req, res, next){
  console.log('contacted by'+req.body.collector_name);
  res.json({"status":"success"})
})

//collector downloaded the work
router.post('/initiate-download-process', function(req, res, next){
  console.log('contacted by'+req.body.collector_email);
  res.json({"status":"success"})
})

router.get('/contact', function(req,res,next){
  res.render('contact',{domain: process.env.DOMAIN});
})

router.get('/about', function(req,res,next){
  res.render('about',{domain: process.env.DOMAIN});
})

router.get('/error-general', function(req,res,next){
  res.render('error',{domain: process.env.DOMAIN});
})

router.get('/success-contact', function(req,res,next){
  res.render('success-contact',{domain: process.env.DOMAIN});
})

router.get('/success-download', function(req,res,next){
  res.render('success-download',{domain: process.env.DOMAIN});
})


module.exports = router;
