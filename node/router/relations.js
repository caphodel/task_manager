var
	express = require('express'),
	md5 = require('md5'),
	bodyParser = require('body-parser'),
	sequelize = require("sequelize"),
	fs = require('fs'),
	crypto = require('crypto'),
	router = express.Router(),
	checkCache = function (filename, req, res, callback) {
		fs.readFile('./cache/' + filename, {
			encoding: 'utf-8'
		}, function (err, data) {
			if (!err) {
				res.status(200);
				res.jsonp(JSON.parse(data));
			} else {
				callback(req, res)
			}
		});
	};

var getData = function (req, res) {
	var hash = crypto.createHmac('sha256', req.app.get("salt"))
		.update(req.originalUrl.split('?')[0])
		.digest('hex');
	var db = req.app.get("db"),
		options = {
			where: {
				id: req.params.issue_id
			}
		};

	delete options.where.callback;
	delete options.where._;

	var issues = global.model['issues'],
		trackers = global.model['trackers'],
		priority = global.model['enumerations'],
		issue_statuses = global.model['issue_statuses'],
		users = global.model['users'],
		all_issue_relation = global.model['all_issue_relation'];

	options.include = [{
		model: issues,
		include: [{
			model: trackers,
			attributes: ["id", "name"]
            }, {
			model: issue_statuses,
			as: 'status',
			attributes: ["id", "name", "is_closed"]
            }, {
			model: users,
			as: 'assigned_to',
			attributes: ["id", [db.fn('CONCAT', db.col("issue->assigned_to.firstname"), " ", db.col("issue->assigned_to.lastname")), "name"]]
            }, {
			model: priority,
			as: 'priority',
			attributes: ["id", "name"]
            }, {
			model: users,
			as: 'author',
			attributes: ["id", [db.fn('CONCAT', db.col("issue->author.firstname"), " ", db.col("issue->author.lastname")), "name"]]
            }]
        }]
	all_issue_relation.findAll(options).then(data => {
		res.status(200);
		fs.writeFile('cache/' + hash + '.cch', JSON.stringify(data));
		res.jsonp(data);
	}).catch(function (error) {
		res.status(500);
		res.jsonp({
			error: error,
			stackError: error.stack
		});
	});
}

router.get('/:issue_id?', function (req, res) {
	var hash = crypto.createHmac('sha256', req.app.get("salt"))
		.update(req.originalUrl.split('?')[0])
		.digest('hex');
	checkCache(hash + '.cch', req, res, function (req, res) {
		/*var db = req.app.get("db"),
			options = {
				where: {
					id: req.params.issue_id
				}
			};

		delete options.where.callback;
		delete options.where._;

		var issues = global.model['issues'],
			trackers = global.model['trackers'],
			priority = global.model['enumerations'],
			issue_statuses = global.model['issue_statuses'],
			users = global.model['users'],
			all_issue_relation = global.model['all_issue_relation'];

		options.include = [{
			model: issues,
			include: [{
				model: trackers,
				attributes: ["id", "name"]
            }, {
				model: issue_statuses,
				as: 'status',
				attributes: ["id", "name", "is_closed"]
            }, {
				model: users,
				as: 'assigned_to',
				attributes: ["id", [db.fn('CONCAT', db.col("issue->assigned_to.firstname"), " ", db.col("issue->assigned_to.lastname")), "name"]]
            }, {
				model: priority,
				as: 'priority',
				attributes: ["id", "name"]
            }, {
				model: users,
				as: 'author',
				attributes: ["id", [db.fn('CONCAT', db.col("issue->author.firstname"), " ", db.col("issue->author.lastname")), "name"]]
            }]
        }]

		all_issue_relation.findAll(options).then(data => {
			res.status(200);
			fs.writeFile('cache/' + hash + '.cch', JSON.stringify(data));
			res.jsonp(data);
		}).catch(function (error) {
			res.status(500);
			res.jsonp({
				error: error,
				stackError: error.stack
			});
		});*/
		getData(req, res);
	})
});

router.get('/:issue_id/:issue_id_related', function (req, res) {
	var hash = crypto.createHmac('sha256', req.app.get("salt"))
		.update(req.originalUrl.split('?')[0])
		.digest('hex');
	var db = req.app.get("db");
	db.query("insert into issue_relations(issue_from_id, issue_to_id, relation_type) values('" + req.params.issue_id + "', '" + req.params.issue_id_related + "', 'relates')").then(relation => {
		getData(req, res)
		/*res.status(200);
		res.jsonp({
			status: true
		});*/
	})
})

global.notoken.push(/\/api\/relation\/\w*/ig)

module.exports = router;
