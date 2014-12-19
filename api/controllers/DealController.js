/**
 * DealController
 *
 * @description :: Server-side logic for managing deals
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// data.dealId 
	// data.foodId
	addFood: function(req, res) {
		var data = JSON.parse(JSON.stringify(req.body));
		console.log(data);
		Deal.findOne(data.dealId).exec(function(err, theDeal) {
			if (err) {
				console.log(err);
				res.json({
					success: false
				});
				return;
			}
			theDeal.items.add(data.foodId);
			theDeal.save(function(err, newDeal) {
				res.json({
					success: true,
					dealUpdated: newDeal
				});
			});
			
		})
	}
};

