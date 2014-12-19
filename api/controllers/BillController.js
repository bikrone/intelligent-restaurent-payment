/**
 * BillController
 *
 * @description :: Server-side logic for managing bills
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// data.billDetail: detail about bill
	// data.items: list of food in this bill
	generateBill: function(req, res) {
		var data = JSON.parse(JSON.stringify(req.body));
		console.log(data);
		Bill.create(data.billDetail).exec(function(err, newBill) {
			if (err) {
				console.log(err);
				res.json({
					success: false				
				});					
				return;
			}
			console.log(JSON.stringify(newBill));
			var i;
			for (i in data.items) {
				var item = data.items[i];
				newBill.items.add(item);
				console.log(item);
			}
			newBill.save(function(err, theBill) {
				res.json({
					success: true,
					newBill: theBill
				});						
			});
			
		});
		
	},

	// data.billId 
	// data.foodId
	addFood: function(req, res) {
		var data = JSON.parse(JSON.stringify(req.body));
		console.log(data);
		Bill.findOne(data.billId).exec(function(err, theBill) {
			if (err) {
				console.log(err);
				res.json({
					success: false
				});
				return;
			}
			theBill.items.add(data.foodId);
			theBill.save(function(err, newBill) {
				res.json({
					success: true,
					billUpdated: newBill
				});
			});
			
		})
	}
};

