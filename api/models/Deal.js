/**
* Deal.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	startDate: {
  		type: 'date',
  		required: true
  	},
  	endDate: {
  		type: 'date'
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
  	},
    toJSON: function() {
      require('../Lib/datetime.js');
      var obj = this.toObject();     
      obj.updatedAt = (new Date(obj.updatedAt)).format('mm-dd-yyyy HH:MM:ss');
      obj.createdAt = (new Date(obj.createdAt)).format('mm-dd-yyyy HH:MM:ss');
      obj.startDate = (new Date(obj.startDate)).format('mm-dd-yyyy HH:MM:ss');
      obj.endDate = (new Date(obj.endDate)).format('mm-dd-yyyy HH:MM:ss');
      return obj;
    }
  }
};

