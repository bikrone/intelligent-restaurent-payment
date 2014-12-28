/**
 * FoodController
 *
 * @description :: Server-side logic for managing foods
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// food/getFoodFromCategory/:category
	getFoodFromCategory: function(req, res) {		
		if (req.param("category") === undefined) {
			res.json({
				status: 400,
				reason: 'Wrong parameter'
			});			
		} else {			
			Food.find({category: req.param("category")}).exec(function(err, found) {			
				res.json({
					success: true,
					listOfFood: found
				});			
			});
		}
	},

	// POST /food/:id/setCategory/:category
	setCategory: function(req, res) {
		if (req.param("category") === undefined || req.param("id") === undefined) {
			res.json({
				status: 400,
				reason: 'Wrong parameter'
			});			
		} else {			
			Food.update({id: req.param("id")}, {category: req.param("category")}).exec(function(err, updated) {	
				if (err) {
					res.json({
						status: 400, 
						reason: 'Can\'t update category'					
					});
					return;
				}		
				res.json({
					success: true,
					foodUpdated: updated
				});			
			});
		}
	}
};

