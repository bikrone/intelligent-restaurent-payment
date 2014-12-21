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
  	}
  }
};

