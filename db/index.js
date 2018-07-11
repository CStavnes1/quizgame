'use strict';
// requires 
var config = require('../config');
var Mongoose = require('mongoose');
var logger = require('../logger');

// Connect the database
Mongoose.connect("mongodb://localhost/quiz_one", {
  useMongoClient: true,
});

// error handler
Mongoose.connection.on('error', function(err) {
  if (err) throw err;
});

// require promise library 
Mongoose.Promise = global.Promise;

module.exports = {
  Mongoose,
  models: {
    user: require('./schemas/user.js'),
    room: require('./schemas/room.js'),
    question: require('./schemas/question.js')
  }
};