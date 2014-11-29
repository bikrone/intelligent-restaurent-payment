/**
 * BillController
 *
 * @description :: Server-side logic for managing bills
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// data.billDetail: detail about bill
	// data.items: list of food in this bill
	create: function(req, res) {
		var data = JSON.parse(JSON.Stringify(req.body));
		Food.create(data.billDetail).exec(function(err, newBill) {
			data.items.forEach(function(item) {
				newBill.items.add(item);
			});			
		});
	}
};

