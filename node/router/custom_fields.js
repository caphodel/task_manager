var
	express = require('express'),
	md5 = require('md5'),
	router = express.Router(),
	bodyParser = require('body-parser');

router.get('/total', function (req, res) {
	var db = req.app.get("db"),
		options = {
			where: {

			}
		};

	if (req.query.orderby)
		options.order = JSON.parse(req.query.orderby)

	if (req.query.where) {
		var where = req.query.where;
		if (where.main) {
			options.where = where.main
		}
	}

	delete options.where.callback;
	delete options.where._;

	options.attributes = [[sequelize.fn('count', sequelize.col('custom_fields.id')), 'total']]

	var custom_fields = global.model['custom_fields'],
		custom_field_trackers = global.model['custom_fields_trackers'];

	options.include = [{
		model: custom_field_trackers,
		attributes: []
	}]

	custom_fields.findAll(options).then(data => {
		res.status(200);
		res.jsonp(data);
	}).catch(function (error) {
		res.status(500);
		res.jsonp({
			error: error,
			stackError: error.stack
		});
	});
})

router.get('/list/:limit?/:offset?', function (req, res) {
	var db = req.app.get("db"),
		options = {
			where: {

			}
		};

	if (req.query.orderby)
		options.order = JSON.parse(req.query.orderby)

	if (req.query.where) {
		var where = req.query.where;
		if (where.main) {
			options.where = where.main
		}
	}

	if (!req.params.limit) {

	} else {
		options.limit = parseInt(req.params.limit)
	}

	if (!req.params.offset) {

	} else {
		options.offset = parseInt(req.params.offset)
	}

	if (options.where) {
		delete options.where.callback;
		delete options.where._;
	}

	var custom_fields = global.model['custom_fields'],
		custom_field_trackers = global.model['custom_fields_trackers'];

	options.include = [{
		model: custom_field_trackers,
		attributes: []
	}]

	if(req.query.group){
		options.group = req.query.group
	}

	custom_fields.findAll(options).then(data => {
		res.status(200);
		res.jsonp(data);
	}).catch(function (error) {
		res.status(500);
		res.jsonp({
			error: error,
			stackError: error.stack
		});
	});
})

global.notoken.push('/api/custom_field/total')
global.notoken.push('/api/custom_field/list')
global.notoken.push(/\/api\/custom_field\/list\/\w*/ig)

module.exports = router;
