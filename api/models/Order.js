/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	foodId: {
  		model: 'food',
  		required: true
  	},
  	billId: {
  		model: 'bill',
  		required: true
  	},
  	number: {
  		type: 'integer',  		
  		defaultsTo: 1
  	},    
    toJSON: function() {
      require('../Lib/datetime.js');
      var obj = this.toObject();     
      obj.updatedAt = (new Date(obj.updatedAt)).format('mm-dd-yyyy HH:MM:ss');
      obj.createdAt = (new Date(obj.createdAt)).format('mm-dd-yyyy HH:MM:ss');     
      return obj;
    }
  }
};

