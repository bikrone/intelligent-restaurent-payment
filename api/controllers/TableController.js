/**
 * TableController
 *
 * @description :: Server-side logic for managing tables
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
require('../Lib/datetime.js');  
module.exports = {
	// POST /table/:id/completePayment/
	completePayment: function(req, res) {
		if (req.param("id") === undefined) {
			res.json({
				status: 400,
				reason: 'Wrong parameter in TableController.completePayment'
			});			
		} else {			
			Table.checkout({id: req.param("id")}, function(err, billResult) {		
				if (err) {
					res.json({
						status: 400,
						error: err
					});		
					return;
				}	
				res.json({
					success: true,
					billResult: billResult
				});			
			});
		}
	},
	
	// POST /table/:id/assignWithBill/:billId
	assignWithBill: function(req, res) {
		if (req.param("id") === undefined || req.param("billId") === undefined) {
			res.json({
				status: 400,
				reason: 'Wrong parameter'
			});			
		} else {			
			Table.update({id: req.param("id")}, {billId: req.param("billId")})
			.exec(function(err, updated) {		
				if (err) {
					res.json({
						status: 400,
						reason: 'Wrong parameter'
					});		
					return;
				}	
				res.json({
					success: true,
					tableUpdated: updated					
				});			
			});
		}
	},

	// POST /table/getUpdateSinceTime
	// data = { datetime: '12/11/2014 11:11:11'}
	getUpdateSinceTime: function(req,res) {
		var data = JSON.parse(JSON.stringify(req.body));
		if (data.datetime === undefined) {
			data.datetime = new Date('1/1/1970');
		}
		else data.datetime = new Date(data.datetime);
		Table.find().where({ updatedAt: {'>': data.datetime} }).exec(function(err, tables) {
			if (err) {
				res.json({
					status: 400,
					error: err
				});
				return;
			}
			if (!tables || tables.length == 0) {
				res.json({
					status: 400,
					error: 'No update'
				});
				return;
			}

			var lastUpdated = tables[0].updatedAt;
			console.log(tables.length);
			for (var i=0; i<tables.length; i++) {
				if (lastUpdated < tables[i].updatedAt) {
					console.log(tables[i].updatedAt);
					lastUpdated = tables[i].updatedAt;
				}
			} 
			              
			res.json({
				success: true,
				tableUpdated: tables,
				lastUpdated: lastUpdated.format('mm-dd-yyyy HH:MM:ss')
			});
		});
	}
};

