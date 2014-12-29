/**
 * BillController
 *
 * @description :: Server-side logic for managing bills
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	// GET /bill	
	getAllBill: function(req, res) {
		console.log('Go in BillController.getAllBill');
		Bill.find().sort('id DESC').limit(200).exec(function(err, listOfBills) {
			if (err) {
				res.json({
					status: 400,
					error: err
				});
				return;
			}
			res.json(listOfBills);
		});
	},
	// data.billDetail: detail about bill
	// data.items: list of food in this bill
	generateBill: function(req, res) {
		console.log('Go in BillController.generateBill');
		var data = JSON.parse(JSON.stringify(req.body));		
		Bill.create(data.billDetail).exec(function(err, newBill) {
			if (err) {
				console.log(err);
				res.json({
					status: 400				
				});					
				return;
			}
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
	// data.number
	addFood: function(req, res) {
		console.log('Go in BillController.addFood');
		var data = JSON.parse(JSON.stringify(req.body));
		if (data.number === undefined || data.number<0) data.number = 1;		
		Order.findOne({billId: data.billId, foodId: data.foodId}).exec(function(err, theOrder) {						
			if (err || theOrder === undefined) {
				Order.create({billId: data.billId, foodId: data.foodId, number: data.number}).exec(function(err, newOrder) {
					if (err) {
						console.log(err);
						res.json({
							status: 400
						});
						return;
					}
					res.json({
						success: true,
						data: newOrder
					});
				});							
			} else {
				Order.update({id: theOrder.id}, {number: theOrder.number+data.number}).exec(function(err, newOrder) {
					if (err) {
						console.log(err);
						res.json({
							status: 400
						});
						return;
					}
					res.json({
						success: true,
						data: newOrder
					});
				});
			}
		});		
	},

	// delete food from bill
	removeFood: function(req, res) {
		console.log('Go in BillController.removeFood');
		var data = JSON.parse(JSON.stringify(req.body));
		if (data.number === undefined || data.number<0) data.number = 1;

		Order.findOne({billId: data.billId, foodId: data.foodId}).exec(function(err, theOrder) {					
			if (err || theOrder === undefined) {
				res.json({
					status: 400,
					reason: 'No data found'
				});
				return;
			} else {
				if (theOrder.number <= data.number) {
					Order.destroy({id: theOrder.id}).exec(function(err) {
						res.json({
							success: true
						});
						return;
					});
				} else {
					Order.update({id: theOrder.id}, {number: theOrder.number-data.number}).exec(function(err, newOrder) {
						if (err) {
							console.log(err);
							res.json({
								status: 400
							});
							return;
						}
						res.json({
							success: true,
							data: newOrder
						});
					});
				}				
			}
		});		
	},

	// delete the whole food
	// delete food from bill

	destroyFood: function(req, res) {
		console.log('Go in BillController.destroyFood');
		var data = JSON.parse(JSON.stringify(req.body));				
		Order.destroy({billId: data.billId}).exec(function(err) {
			res.json({
				success: true
			});
			return;
		});
	},

	// GET /bill/getFood/:billId
	getFood: function(req, res) {		
		if (req.param("billId") === undefined) {
			res.json({
				status: 400,
				reason: 'Wrong parameter'
			});			
		} else {
			var result = [];
			Order.find({billId: req.param("billId")}).populate('foodId').exec(function(err, found) {
				while (found.length) {
					var tmp = found.pop();
					result.push({foodId: tmp.foodId.id, food: tmp.foodId, number: tmp.number});
				}
				res.json({
					success: true,
					listOfFood: result
				});			
			});
		}
	}
};

