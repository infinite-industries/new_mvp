var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var nunjucks = require('nunjucks'); //Added nunjucks for templating

dotenv.load(); //get configuration file from .env

//Configure Nunjucks
var PATH_TO_TEMPLATES = 'views';
nunjucks.configure(PATH_TO_TEMPLATES, {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

app.use(bodyParser.json());


var routes = require('./routes/index');
app.use('/', routes);

app.use(express.static('public'));

var payments = require('./routes/payments');
app.use('/process-payment', payments);

app.use(function (req, res) {
    res.render('404', {
        domain: process.env.DOMAIN
    });
});

var appPort = 7779;

app.listen(appPort, function () {
    console.log("Magic on port %d", appPort);
});
