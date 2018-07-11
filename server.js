'use strict';
// Set the port for starting the server, process.env for Heroku/deployment
var port = process.env.PORT || 3000;

// local paths
var routes 		= require('./app/routes');
var session 	= require('./app/session');
var passport    = require('./app/auth');
var sickserver 	= require('./app/socket')(app);
var logger 		= require('./app/logger');

// npm dependencies
var express 	= require('express');
var app  		= express();
var path 		= require('path');
var bodyParser 	= require('body-parser');
var flash 		= require('connect-flash');

// set up views
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// app use for body parser, session, passport express, routes 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', routes);

// 404 page
app.use(function(req, res, next) {
  res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
});

sickserver.listen(port);