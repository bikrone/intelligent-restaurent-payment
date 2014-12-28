/**
 * DealController
 *
 * @description :: Server-side logic for managing deals
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// POST: /deal/:id/addFood/:foodId
	addFood: function(req, res) {
		if (req.param("id") === undefined || req.param("foodId") === undefined) {
			res.json({
				status: 400,
				reason: 'Wrong parameter in DealController.addFood function'
			});
			return;		
		}
		var data = {dealId: req.param("id"), foodId: req.param("foodId")};		
		console.log(data);
		Deal.findOne(data.dealId).exec(function(err, theDeal) {
			if (err) {
				console.log(err);
				res.json({
					success: false
				});
				return;
			}
			theDeal.itemsAffected.add(data.foodId);
			theDeal.save(function(err, newDeal) {
				res.json({
					success: true,
					dealUpdated: newDeal
				});
			});			
		})
	}
};

