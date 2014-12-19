/**
* Deal.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	startDate: {
  		type: 'datetime',
  		require: true
  	},
  	endDate: {
  		type: 'datetime'
  	},
  	discount: {
  		type: 'float'
  	},  
  	description: {
  		type: 'text'
  	},
  	itemsAffected: {
  		collection: 'food',
  		via: 'deals'  		
  	}    
  }
};

