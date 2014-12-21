/**
* Bill.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
		orderDate: {
  		type: 'datetime',
  		required: true,
      defaultsTo: function() {
        return new Date();
      }
  	},
  	paymentDate: {
  		type: 'datetime'
  	},
  	paymentPrice: {
  		type: 'float',
  		required: true
  	},
  	customerAddress: {
  		type: 'string',  	
  	},
  	customerName: {
  		type: 'string'
  	},
  	customerPhone: {
  		type: 'string'
  	},
  	isOnline: {
  		type: 'boolean',
  		defaultsTo: false
  	}
  }
};

