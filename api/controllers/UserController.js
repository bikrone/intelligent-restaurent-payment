/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// POST /user/login
	// data = { username: x, password: y }
	login: function(req, res) {
		var data = JSON.parse(JSON.stringify(req.body));
		if (data.username === undefined || data.password === undefined) {
			res.json({
				status: 400, 
				error: 'Wrong parameter in UserController.login function'			
			}, 404);
			return;
		}
		User.loginWithPassword(data, function(err, user) {
			if (err) {
				res.json({
					status: 400,
					error: err
				});
				return;
			}

			// store info in session
			req.session.username = user.username;
			res.json({
				success: true,
				userInfo: user
			});
		});
	},
	checkIfLogined: function(req, res) {
		if (req.session.username === undefined || !req.session.username) {
			return res.json({
				status: 400,
				error: "not login yet"
			});
		}
		res.json({
			logined: true,
			username: req.session.username
		});
	},
	logout: function(req, res) {
		if (req.session.username === undefined || !req.session.username) {
			return res.json({
				status: 400,
				error: "not login yet"
			});
		}
		var username = req.session.username;
		delete req.session.username;
		res.json({
			logouted: true,
			username: username
		});

	}
};

