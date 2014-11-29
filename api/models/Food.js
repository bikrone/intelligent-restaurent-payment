/**
* Food.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string',
  		require: true
  	},
  	imageSmall: {
  		type: 'string'
  	},
  	imageLarge: {
  		type: 'string'
  	},
  	price: {
  		type: 'integer',
  		require: true
  	},
  	description: {
  		type: 'text'
  	},
  	bills: {
  		collection: 'bill',
  		via: 'items',
  		dominant: true
  	},
    deals: {
      collection: 'deal',
      via: 'itemsAffected',
      dominant: true
    }
  }
};

