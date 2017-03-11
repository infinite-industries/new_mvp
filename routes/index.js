var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var dotenv = require('dotenv');
dotenv.load();      //get configuration file from .env

//collector donated money -- worked through stripe

//collector contacted I.I for work availability
router.post('/direct-contact', function(req, res, next){
  console.log('contacted by'+req.body.collector_name);
  res.json({"status":"success"})
})
//collector downloaded the work


module.exports = router;
