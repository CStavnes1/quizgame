'use strict';

// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
// reference for rendering login page(s) using javascript templating + .ejs files 

var config = require('./config');
var passport = require('passport');
var loggern= require('./logger');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

// Authentication code 
var init = function(){
 // auth code goes here 

 // send to and check user instances from session with passport serializeUser and deserializeUser

 // serialize
 passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// de-serialize
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// Insert the passport LocalStrategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: new RegExp(username, 'i') }, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      user.validatePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch){
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
      });
    });
  }
));
return passport;
}
	
module.exports = init();