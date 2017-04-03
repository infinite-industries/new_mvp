var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var axios = require('axios');

var slackMessenger = require('../services/slack_messenger');

var dotenv = require('dotenv');
dotenv.load();      //get configuration file from .env

//collector contacted I.I for work availability
router.post('/direct-contact', function(req, res, next){
  console.log('contacted by'+req.body.collector_name);

  var contact_data={
    collector_name: req.body.collector_name,
    collector_email: req.body.collector_email,
    collector_phone: req.body.collector_phone,
    collector_notes: req.body.collector_notes
  }
  slackMessenger.newContact(contact_data);

  res.json({"status":"success"})
})

router.get('/success-contact', function(req,res,next){
  res.render('success-contact',{domain: process.env.DOMAIN});
})

//collector initiates work download
router.post('/initiate-download-process', function(req, res, next){
  console.log('contacted by: '+req.body.download_email);
  console.log('can email: '+req.body.download_okToPutOnEmailList);

  var download= "amanda_church"; //manually set for now

  axios.post(process.env.FILE_SERVER_ADDRESS+'/create-download-key', {
    user_email: req.body.download_email,
    which_file: download,
    password: process.env.FILE_SERVER_KEY
  })
  .then(function (response) {
    if(response.status==200){

      slackMessenger.newDownload(req.body.download_email,response.data.uuid,req.body.download_okToPutOnEmailList);
      res.json({"status":"success"});
    }
    else{
      res.json({"status":"error"});
    }

  })
  .catch(function (error) {
    console.log(error);
    res.json({"status":"error"});
  });

})


///--------------------
router.get('/contact', function(req,res,next){
  res.render('contact',{domain: process.env.DOMAIN});
})

router.get('/about', function(req,res,next){
  res.render('about',{domain: process.env.DOMAIN, current_page: 'about'});
})

router.get('/error-general', function(req,res,next){
  res.render('error',{domain: process.env.DOMAIN});
})

router.get('/success-download', function(req,res,next){
  res.render('success-download',{domain: process.env.DOMAIN});
})


module.exports = router;
