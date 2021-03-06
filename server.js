var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var bootstrap = require('./firebase');
var bodyParser = require("body-parser");
var api = require('./api');

app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Server started on PORT: ' + port);
