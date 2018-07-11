"use strict";

// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');

// local files 
var User = require('./models/user');
var Room = require('./models/room');

// routes: login, register, home, rooms, gameRoom, logout, history page 

// login route
router.post('/login', passport.authenticate('local', {
  // on successful login redirect to the rooms page 
  successRedirect: '/rooms',
  // on failed login 
  failureRedirect: '/',
  failureFlash: true
}));

// registration route 
router.post('/register', function(req, res, next) {
  var credentials = { 'username': req.body.username, 'password': req.body.password };
  if (credentials.username === '' || credentials.password === '') {
    req.flash('error', 'Missing credentials');
    req.flash('showRegisterForm', true);
    res.redirect('/');
  } else {
    // Check if the user already exists in local passport
    User.findOne({ 'username': new RegExp('^' + req.body.username + '$', 'i') }, function(err, user) {
      if (err) throw err;
      // if the username already exists, throw the error
      if (user) {
        req.flash('error', 'This user name already exists. Please choose a new one');
        // show the registration form again
        req.flash('showRegisterForm', true);
        // redirect to dump the content
        res.redirect('/');
      } else {
        // if the user object DOES NOT exist already, create them using the captured credentials from input form/post 
        User.create(credentials, function(err, newUser) {
          if (err) throw err;
          req.flash('success', 'Your account has been created. Please log-in using the username/password you just created');
          // redirect back to the main page 
          res.redirect('/');
        });
      }
    });
  }
});

// Logout route
router.get('/logout', function(req, res, next) {
    // remove the req.user property and clear the login session
    req.logout();
  
    // destroy session data
    req.session = null;
  
    // redirect to homepage
    res.redirect('/');
  });