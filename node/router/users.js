var
	express = require('express'),
	md5 = require('md5'),
	router = express.Router();

router.post('/', function (req, res) {
	var db = req.app.get("db");

	const users = db.import('../models/users');

	req.body.hashed_password = md5(req.body.login + ":tame:" + req.body.password);

	users.update(req.body, {
		where: {
			id: req.body.id
		}
	}).then(function (data) {
		res.status(200);
		res.json(data);
	}).catch(function (error) {
		res.status(500);
		res.json({
			error: error,
			stackError: error.stack
		});
	});
});

router.put('/', function (req, res) {
	var db = req.app.get("db");

	const users = db.import('../models/users');

	req.body.hashed_password = md5(req.body.login + ":tame:" + req.body.password);

	users.create(req.body).then(function (data) {
		res.status(200);
		res.json(data);
	}).catch(function (error) {
		res.status(500);
		res.json({
			error: error,
			stackError: error.stack
		});
	});
});

/**
 * @api {delete} /api/users Delete user
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 */

router.delete('/', function (req, res) {
	var db = req.app.get("db");

	const users = db.import('../models/users');

	users.destroy({
		where: {
			id: req.body.id
		}
	}).then(function (data) {
		res.status(200);
		res.json(data);
	}).catch(function (error) {
		res.status(500);
		res.json({
			error: error,
			stackError: error.stack
		});
	});
});

router.get('/', function (req, res) {
	var db = req.app.get("db");

	const users = db.import('../models/users');

	users.findAll({
		where: req.query
	}).then(data => {
		res.status(200);
		res.json(data);
	}).catch(function (error) {
		res.status(500);
		res.json({
			error: error,
			stackError: error.stack
		});
	});
});

module.exports = router;
