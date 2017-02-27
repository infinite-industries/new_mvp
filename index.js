var express = require('express');
var app = express();

app.use(express.static('public'));

var appPort=7779;

app.listen(appPort, function () {
  console.log("Magic on port %d",appPort);
});
