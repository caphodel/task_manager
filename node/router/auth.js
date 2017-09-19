var
	express = require('express'),
	md5 = require('md5'),
	jwt = require('jsonwebtoken'),
	router = express.Router();

router.post('/', function (req, res) {
	var db = req.app.get("db");

	const users = db.import('../models/users');
	//const roles = db.import('../models/roles');

    //users.hasOne(roles, {foreignKey: 'fk_companyname', targetKey: 'id'})

	req.body.hashed_password = md5(req.body.username + ":tame:" + req.body.password);

	users.findOne({
		where: {
			login: req.body.username,
			hashed_password: req.body.hashed_password
		}
	}).then(function (result) {
		res.status(200);
		var data = {};
		if (result == null) {
			data = {
				success: false,
				message: 'Authentication failed.'
			}
		} else {
			data = {
				success: true,
				message: 'Authentication success.',
				token: jwt.sign({login: result.login, }, req.app.get('salt'), {
					expiresIn: '24h'
				})
			}
		}
		res.jsonp(data);
	}).catch(function (error) {
		res.status(500);
		res.jsonp({
			error: error,
			stackError: error.stack
		});
	});
});

global.notoken.push('/api/auth')

module.exports = router;
