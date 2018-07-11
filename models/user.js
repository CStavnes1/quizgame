'use strict';

// import the user model from the database schema
var userModel = require('./database').models.user;

// newuser create function
var create = function (data, callback){
	var newUser = new userModel(data);
	newUser.save(callback);
};

// funduser function
var findOne = function (data, callback){
	userModel.findOne(data, callback);
}

// finduserbyid
var findById = function (id, callback){
	userModel.findById(id, callback);
}

// authentication checker
var isAuthenticated = function (req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('/');
	}
}

module.exports = { 
	create, 
	findOne, 
	findById,  
	isAuthenticated 
};
