'use strict';

var Mongoose = require('mongoose');
var uuid = require('uuid');
var bcrypt = require('bcrypt-nodejs');

// bcrypt/salt stuff for password hashing
const SALT_WORK_FACTOR = 10;
const DEFAULT_USER_PICTURE = "/img/default.jpg";

// each user has a username, password, uId, picture - all pictures are just default for now 
var UserSchema = new Mongoose.Schema({
    username: { type: String, required: true, unique : true},
    password: { type: String, default: null },
    uId: { type: String, default: uuid.v1() },
    picture:  { type: String, default:  DEFAULT_USER_PICTURE}
});

// before saving the content make sure the password has been obscured
UserSchema.pre('save', function(next) {
    var user = this;

    // might be used for future functionality - user icon/piucture. For now, just give everyone a default icon 
    if(!user.picture){
        user.picture = DEFAULT_USER_PICTURE;
    }

    // hash the password if it's been modified, otherwise just rely on the hash
    if (!user.isModified('password')) return next();

    // generate a "salt"
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        // create the hash
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
            return next(err);
            }
            // replace the text password with the hash
            user.password = hash;
            next();
        });
    });
});

// compare the entered password to the password stored in the database for that user 
UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// create and export user model
var userModel = Mongoose.model('user', UserSchema);
module.exports = userModel;