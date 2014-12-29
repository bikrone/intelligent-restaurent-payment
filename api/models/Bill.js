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
  		required: true,
      defaultsTo: 0
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
  	},   
    billResult: {
      type: 'string',
      defaultsTo: ''
    }, 
    toJSON: function() {
     require('../Lib/datetime.js');
      var obj = this.toObject();     
      obj.updatedAt = (new Date(obj.updatedAt)).format('mm-dd-yyyy HH:MM:ss');
      obj.createdAt = (new Date(obj.createdAt)).format('mm-dd-yyyy HH:MM:ss');
      if (obj.orderDate)
        obj.orderDate = (new Date(obj.orderDate)).format('mm-dd-yyyy HH:MM:ss');
      if (obj.paymentDate)
        obj.paymentDate = (new Date(obj.paymentDate)).format('mm-dd-yyyy HH:MM:ss');
      return obj;
    }
  },
  checkout: function(billId, cb) {    
    console.log('Go in Bill.checkout');
    Order.find({ billId: billId }).populate('foodId').exec(function(err, orders) {
      if (err) return cb(err);
      if ((!orders) || (orders.length == 0)) {
        err = new Error();
        err.message = 'Can\'t find bill with billId ' + JSON.stringify(billId) + ' in Bill.checkout function';
        return cb(err);
      }
      var now = new Date();
      var sumPayment = 0;
      var billResult = 'HOA DON BAN #XXX#\\n';        
              
      for (var i = 0; i<orders.length; i++) {        
        var food = orders[i].foodId;
        var price = food.price*orders[i].number;
        for (var j=0; j<food.deals.length; j++) {
          var deal = food.deals[j];
          if (deal.startDate <= now && deal.endDate >= now)
            price = price*(1-deal.discount);
        }

        billResult += '--- ' + food.name + ': So luong: ' + orders[i].number + ' Gia: ' + food.price*orders[i].number + 'VND\\n';
        if (price<food.price) {
           billResult += ' giam gia con ' + price + 'VND\\n';
        }
        sumPayment += price;
      }        
      
      billResult += 'Tong cong: ' + sumPayment + 'VND\\n';
      Bill.update({ id: billId }, { paymentDate: now, paymentPrice: sumPayment, billResult: billResult })
      .exec(function(err, updated){
        if (err) {
          var err = new Error();
          err.message = 'Cannot update bill';
          return cb(err);
        }              
        cb(null, billResult);  
      });
      
      
    });
  }
};

