/**
* Table.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string',  		
  	},
  	billId: {
      type: 'integer',
      defaultsTo: null
    },
  	description: {
  		type: 'text'
  	},    
    toJSON: function() {
      require('../Lib/datetime.js');
      var obj = this.toObject();     
      obj.updatedAt = (new Date(obj.updatedAt)).format('mm-dd-yyyy HH:MM:ss');
      obj.createdAt = (new Date(obj.createdAt)).format('mm-dd-yyyy HH:MM:ss');   
      return obj;
    }
  },
  checkout: function(opts, cb) {    
    console.log('Go in Table.checkout');
    if (opts === undefined) {
      var err = new Error();
      err.message = 'No argument in Table.Checkout function';
      console.log(err);
      return;
    }
    if (typeof opts === 'object') {      
      setTimeout(Table.findOne(opts).exec(function(err, table) {
        if (err) return cb(err);
        if (!table) {
          err = new Error();
          err.message = 'Can\'t find table with opts ' + JSON.stringify(opts) + ' in Table.checkout function';
          return cb(err);
        }

        setTimeout(Bill.checkout(table.billId, function(err, billResult) {
          if (err) return cb(err);
          Table.update(opts, { billId: null }).exec(function(err, updated) {
            if (err) return cb(err);
            cb(null, billResult.replace('#XXX#', table.id));
          });
        }), 0);
      }), 0);
    } else {
      var err = new Error();
      err.message = 'Wrong parameter in Table.checkout function';
      return cb(err);
    }
  }
};

