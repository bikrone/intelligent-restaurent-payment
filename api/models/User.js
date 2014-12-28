/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var sha1 = require('../Lib/encrypt.js');
module.exports = {

  attributes: {
  	username: {
  		type: 'string',
  		unique: true,
  		primaryKey: true 
  	},
  	password: {
  		type: 'string',
  		required: true
  	},
  	name: {
  		type: 'string'
  	},
  	position: {
  		type: 'string'
  	},    
    toJSON: function() {
      require('../Lib/datetime.js');
      var obj = this.toObject();     
      obj.updatedAt = (new Date(obj.updatedAt)).format('mm-dd-yyyy HH:MM:ss');
      obj.createdAt = (new Date(obj.createdAt)).format('mm-dd-yyyy HH:MM:ss');    
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(obj, next) {
  	console.log("I was here");
  	obj.password = sha1(obj.password);
  	console.log(obj.password);
  	next();
  },
  loginWithPassword: function(opts, cb) {
  	var username = opts.username;
  	var password = sha1(opts.password);
  	User.findOne({username: username, password: password}).exec(function(err, user){
  		if (err) return cb(err);
  		if (!user) {
  			err = new Error();
  			err.message = 'Invalid username or password';
  			return cb(err);
  		}
  		cb(null, user);
  	});
  }
};

