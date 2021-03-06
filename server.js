'use strict';
// Set the port for starting the server, process.env for Heroku/deployment
var port = process.env.PORT || 3000;

// local paths
var routes 		= require('./routes');
var session 	= require('./session');
var passport    = require('./auth');
var sickserver 	= require('./socket')(app);
var logger 		= require('./logger');

// npm dependencies
var express 	= require('express');
var app  		= express();
var path 		= require('path');
var bodyParser 	= require('body-parser');
var flash 		= require('connect-flash');

// set up views
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// handle 404
app.use(function(req, res, next) {
    res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
  });

// app use for body parser, session, passport express, routes 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', routes);

sickserver.listen(port);