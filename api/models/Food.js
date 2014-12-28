/**
* Food.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true    
    },
  	name: {
  		type: 'string',
  		required: true
  	},
  	imageSmall: {
  		type: 'string'
  	},
  	imageLarge: {
  		type: 'string'
  	},
  	category: {
  		type: 'string'
  	},
  	price: {
  		type: 'integer',
  		required: true
  	},
  	description: {
  		type: 'text'
  	},  
    deals: {
      collection: 'deal',
      via: 'itemsAffected',
      dominant: true
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

