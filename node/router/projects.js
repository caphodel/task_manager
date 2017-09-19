var
    express = require('express'),
    md5 = require('md5'),
    router = express.Router(),
    sequelize = require("sequelize"),
    findValue = function (o, value) {
        for (var prop in o) {
            if (o.hasOwnProperty(prop) && o[prop] === value) {
                return prop;
            }
        }
        return null;
    },
    valuesToArray = function (obj) {
        var data = {},
            c = 0;
        for (var key in obj.dataValues) {
            if (obj.dataValues.hasOwnProperty(key)) {
                if (typeof obj[key] != 'object') {
                    data[c] = obj[key]
                    c++
                } else {
                    if (typeof obj['_options'].includeNames != 'undefined') {
                        if ( /*findValue(obj['_options'].includeNames, key)*/ obj['_options'].includeNames.indexOf(key) != -1) {
                            data[key] = obj[key].dataValues
                        }
                    }
                }
            }
        }
        return data;
    };

router.get('/total', function (req, res) {
    var db = req.app.get("db");

    db.query('select count(*) as total from projects', {
        type: db.QueryTypes.SELECT
    }).then(count => {
        res.status(200);
        res.jsonp(count[0]);
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
            where: JSON.parse(JSON.stringify(req.query))
        };

    delete options.where.callback;
    delete options.where._;

    if (!req.params.limit) {

    } else {
        options.limit = parseInt(req.params.limit)
    }

    if (!req.params.offset) {

    } else {
        options.offset = parseInt(req.params.offset)
    }

    const projects = db.import('../models/projects');

    projects.findAll(options).then(data => {
        /*for (var i = 0; i < data.length; i++) {
            data[i] = valuesToArray(data[i])
        }*/
        res.status(200);
        res.jsonp(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
});

/*router.get('/test', function(req, res){
    var db = req.app.get("db")
    query = "SELECT `issues`.`id`, count(`issues`.`id`) AS `tracker_count`, `tracker`.`id` AS `tracker.id`, `tracker`.`name` AS `tracker.name` FROM `issues` AS `issues` LEFT OUTER JOIN `projects` AS `project` ON `issues`.`project_id` = `project`.`id` LEFT OUTER JOIN `trackers` AS `tracker` ON `issues`.`tracker_id` = `tracker`.`id` WHERE `project`.`identifier` = 'proj-164y2017' GROUP BY `tracker_id`;";
    db.query(query, {
        type: db.QueryTypes.SELECT
    }).then(count => {
        res.status(200);
        res.jsonp(count[0]);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
})*/

router.get('/:identifier', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: {
                identifier: req.params.identifier
            }
        };

    //const projects = db.import('../models/projects');
    projects = global.model['projects']

    projects.findOne(options).then(data => {
        for (var i = 0; i < data.length; i++) {
            data[i] = valuesToArray(data[i])
        }
        res.status(200);
        res.jsonp(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
});

router.get('/:identifier/member', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: {
                '$project.identifier$': req.params.identifier
            }
        };

    const members = db.import('../models/members');
    const projects = db.import('../models/projects');
    const users = db.import('../models/users');

    projects.hasMany(members)
    members.belongsTo(projects);
    users.hasOne(members)
    members.belongsTo(users);

    options.include = [{
        model: projects,
        required: false,
        attributes: []
    }, {
        model: users,
        attributes: ['id', 'firstname', 'lastname'],
        foreignKey: 'id',
        targetKey: 'user_id'
    }]

    members.findAll(options).then(data => {
        for (var i = 0; i < data.length; i++) {
            data[i] = valuesToArray(data[i])
        }
        res.status(200);
        res.jsonp(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
});

router.get('/:identifier/issue/groupby/tracker', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: JSON.parse(JSON.stringify(req.query))
        };

    options.where['$project.identifier$'] = parseInt(req.params.identifier)

    delete options.where.callback;
    delete options.where._;

    var projects = global.model['projects'],
        issues = global.model['issues'],
        trackers = global.model['trackers'],
        issue_statuses = global.model['issue_statuses']

    options.include = [{
        model: projects,
        required: false,
        attributes: []
    }, {
        model: trackers,
        attributes: ["id", "name"]
    }, {
        model: issue_statuses,
        as: 'status',
        attributes: []
    }]

    options.group = ['tracker_id']

    options.attributes = [[sequelize.fn('count', sequelize.col('issues.id')), 'tracker_count']]

    issues.findAll(options).then(data => {
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

router.get('/:identifier/issue', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: {
                '$project.identifier$': req.params.identifier
            }
        };

    var projects = global.model['projects'],
        issues = global.model['issues'],
        trackers = global.model['trackers'],
        issue_statuses = global.model['issue_statuses'],
        users = global.model['users'],
        priority = global.model['enumerations'],
        issue_categories = global.model['issue_categories'];

    options.include = [{
        model: projects,
        required: false,
        attributes: ["id", "name"]
    }, {
        model: trackers,
        attributes: ["id", "name"]
    }, {
        model: issue_statuses,
        as: 'status',
        attributes: ["id", "name"]
    }, {
        model: users,
        as: 'assigned_to',
        attributes: ["id", [db.fn('CONCAT', db.col("assigned_to.firstname"), " ", db.col("assigned_to.lastname")), "name"]]
    }, {
        model: priority,
        as: 'priority',
        attributes: ["id", "name"]
    }, {
        model: users,
        as: 'author',
        attributes: ["id", [db.fn('CONCAT', db.col("author.firstname"), " ", db.col("author.lastname")), "name"]]
    }]

    issues.findAll(options).then(data => {
        /*for (var i = 0; i < data.length; i++) {
            data[i] = valuesToArray(data[i])
        }*/
        res.status(200);
        res.jsonp(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
});

router.post('/', function (req, res) {
    var db = req.app.get("db");

    const projects = db.import('../models/projects');

    projects.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(function (data) {
        res.status(200);
        res.jsonp(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
});

router.put('/', function (req, res) {
    var db = req.app.get("db");

    const projects = db.import('../models/projects');

    projects.create(req.body).then(function (data) {
        res.status(200);
        res.jsonp(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
});

global.notoken.push('/api/project/total')
global.notoken.push(/\/api\/project\/list\/\w*/ig)

module.exports = router;
