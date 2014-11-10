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
  		require: true
  	},
  	paymentDate: {
  		type: 'datetime'
  	},
  	paymentPrice: {
  		type: 'float',
  		require: true
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
  		defaultsTo: true
  	},
  	items: {
  		collection: 'food',
  		via: 'bills'  		
  	}
  }
};

