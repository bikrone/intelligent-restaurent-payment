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
		console.log('Go in TableController.completePayment');
		if (req.param("id") === undefined) {
			res.json({
				status: 400,
				reason: 'Wrong parameter in TableController.completePayment'
			});			
		} else {			
			setTimeout(Table.checkout({id: req.param("id")}, function(err, billResult) {		
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
			}), 0);
		}
	},
	
	// POST /table/:id/assignWithBill/:billId
	assignWithBill: function(req, res) {
		console.log('Go in TableController.assignWithBill');
		if (req.param("id") === undefined || req.param("billId") === undefined) {
			res.json({
				status: 400,
				reason: 'Wrong parameter'
			});			
		} else {			
			var toReplace = req.param("billId");
			if (toReplace == 0) toReplace = null;

			Table.update({id: req.param("id")}, {billId: toReplace})
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
		console.log('Go in TableController.getUpdateSinceTime');
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

