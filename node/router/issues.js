var
    express = require('express'),
    md5 = require('md5'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    moment = require('moment'),
    sequelize = require("sequelize"),
    findValue = function (o, value) {
        for (var prop in o) {
            if (o.hasOwnProperty(prop) && o[prop] === value) {
                return prop;
            }
        }
        return null;
    };

router.get('/total', function (req, res) {
    var db = req.app.get("db"),
        options = {
            distinct: true,
            where: {}
        };

    if (req.query.orderby)
        options.order = JSON.parse(req.query.orderby)

    if (req.query.where) {
        var where = req.query.where;
        if (where.main) {
            options.where = where.main
        }
    }

    if (req.query.fromGlobal) {
        for (var prop in req.query.fromGlobal) {
            if (req.query.fromGlobal.hasOwnProperty(prop)) {
                options.where[prop] = global.save[req.query.fromGlobal[prop]]
                //delete global.save[req.query.fromGlobal[prop]];
            }
        }
    }

    if (req.query.operator) {
        for (var prop in req.query.operator) {
            if (req.query.operator.hasOwnProperty(prop)) {
                var operator = req.query.operator[prop]
                switch (operator) {
                    case '!':
                        if (typeof options.where[prop] == 'object')
                            options.where[prop] = {
                                $notIn: options.where[prop]
                            }
                        else
                            options.where[prop] = {
                                $ne: options.where[prop]
                            }
                        break;
                    case '=':
                        if (typeof options.where[prop] == 'object')
                            options.where[prop] = {
                                $in: options.where[prop]
                            }
                        else
                            options.where[prop] = {
                                $eq: options.where[prop]
                            }
                        break;
                    case '!*':
                        options.where[prop] = {
                            $in: [null, '']
                        }
                        break;
                    case '*':
                        delete options.where[prop];
                        break;
                    case '>=':
                        options.where[prop] = {
                            $gte: options.where[prop]
                        };
                        break;
                    case '<=':
                        options.where[prop] = {
                            $lte: options.where[prop]
                        };
                        break;
                    case '~':
                        options.where[prop] = {
                            $like: '%' + options.where[prop] + '%'
                        };
                        break;
                    case '!~':
                        options.where[prop] = {
                            $notLike: '%' + options.where[prop] + '%'
                        };
                        break;
                    case '=r':
                        options.where[prop] = {
                            $regexp: options.where[prop]
                        };
                        break;
                    case '!r':
                        options.where[prop] = {
                            $notRegexp: options.where[prop]
                        };
                        break;
                    case '>t-':
                        options.where[prop] = {
                            $gt: moment().subtract(options.where[prop], 'day').startOf('day').toDate()
                        };
                        break;
                    case '<t-':
                        options.where[prop] = {
                            $lt: moment().subtract(options.where[prop], 'day').startOf('day').toDate()
                        };
                        break;
                    case 't-':
                        options.where[prop] = {
                            $between: [moment().subtract(options.where[prop], 'day').startOf('day').toDate(), moment().subtract(options.where[prop], 'day').endOf('day').toDate()]
                        };
                        break;
                    case 't':
                        options.where[prop] = {
                            $between: [moment().startOf('day').toDate(), moment().endOf('day').toDate()]
                        };
                        break;
                    case 'w':
                        options.where[prop] = {
                            $between: [moment().startOf('week').toDate(), moment().endOf('week').toDate()]
                        };
                        break;
                    case '>t+':
                        options.where[prop] = {
                            $gt: moment().add(options.where[prop], 'day').startOf('day').toDate()
                        };
                        break;
                    case '<t+':
                        options.where[prop] = {
                            $between: [moment().startOf('day').toDate(), moment().add(options.where[prop], 'day').startOf('day').toDate()]
                        };
                        break;
                    case 't+':
                        options.where[prop] = {
                            $between: [moment().add(options.where[prop], 'day').startOf('day').toDate(), moment().add(options.where[prop], 'day').endOf('day').toDate()]
                        };
                        break;
                }
            }
        }
    }

    //options.group = ['issues.id']

    delete options.where.callback;
    delete options.where._;

    var projects = global.model['projects'],
        issues = global.model['issues'],
        trackers = global.model['trackers'],
        issue_statuses = global.model['issue_statuses'],
        users = global.model['users'],
        priority = global.model['enumerations'],
        custom_values = global.model['custom_values'],
        custom_fields = global.model['custom_fields'],
        time_entries = global.model['time_entries'],
        issue_categories = global.model['issue_categories'];

    options.attributes = ['id' /*, [sequelize.fn('count', sequelize.col('issues.id')), 'total']*/ ]

    options.include = [{
            model: projects,
            required: false,
            attributes: [],
            where: {
                'id': {
                    $not: null
                }
            }
    }, {
            model: trackers,
            attributes: []
    }, {
            model: issue_statuses,
            as: 'status',
            where: req.query.where ? req.query.where.status ? req.query.where.status : null : null,
            attributes: []
    }, {
            model: users,
            as: 'assigned_to',
            attributes: []
    }, {
            model: priority,
            as: 'priority',
            attributes: []
    }, {
            model: users,
            as: 'author',
            attributes: []
    }
        /*, {
                model: custom_values,
                where: req.query.where ? req.query.where.custom_values ? req.query.where.custom_values : null : null,
                include: [{
                    model: custom_fields,
                    attributes: []
                }],
                attributes: []
            }*/
        , {
            model: time_entries,
            attributes: []
    }]

    if (options.where['$status.is_closed$'] != undefined) {
        options.include[2].where = {
            'is_closed': options.where['$status.is_closed$']
        }
        delete options.where['$status.is_closed$'];
    }

    /*options.where['project_id'] = {
        $in: db.literal('(select id from projects)'),
    }*/

    issues.count(options).then(data => {
        res.status(200);
        res.jsonp([{
            total: data
        }]);
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
            where: {},
            order: []
        }

    if (req.query.orderby)
        options.order = JSON.parse(req.query.orderby)

    if (req.query.where) {
        var where = req.query.where;
        if (where.main) {
            options.where = where.main
        }
    }

    if (req.query.fromGlobal) {
        for (var prop in req.query.fromGlobal) {
            if (req.query.fromGlobal.hasOwnProperty(prop)) {
                options.where[prop] = global.save[req.query.fromGlobal[prop]]
                //delete global.save[req.query.fromGlobal[prop]];
            }
        }
    }

    if (req.query.operator) {
        for (var prop in req.query.operator) {
            if (req.query.operator.hasOwnProperty(prop)) {
                var operator = req.query.operator[prop]
                switch (operator) {
                    case '!':
                        if (typeof options.where[prop] == 'object')
                            options.where[prop] = {
                                $notIn: options.where[prop]
                            }
                        else
                            options.where[prop] = {
                                $ne: options.where[prop]
                            }
                        break;
                    case '=':
                        if (typeof options.where[prop] == 'object')
                            options.where[prop] = {
                                $in: options.where[prop]
                            }
                        else
                            options.where[prop] = {
                                $eq: options.where[prop]
                            }
                        break;
                    case '!*':
                        options.where[prop] = {
                            $in: [null, '']
                        }
                        break;
                    case '*':
                        delete options.where[prop];
                        break;
                    case '>=':
                        options.where[prop] = {
                            $gte: options.where[prop]
                        };
                        break;
                    case '<=':
                        options.where[prop] = {
                            $lte: options.where[prop]
                        };
                        break;
                    case '~':
                        options.where[prop] = {
                            $like: '%' + options.where[prop] + '%'
                        };
                        break;
                    case '!~':
                        options.where[prop] = {
                            $notLike: '%' + options.where[prop] + '%'
                        };
                        break;
                    case '=r':
                        options.where[prop] = {
                            $regexp: options.where[prop]
                        };
                        break;
                    case '!r':
                        options.where[prop] = {
                            $notRegexp: options.where[prop]
                        };
                        break;
                    case '>t-':
                        options.where[prop] = {
                            $gt: moment().subtract(options.where[prop], 'day').startOf('day').toDate()
                        };
                        break;
                    case '<t-':
                        options.where[prop] = {
                            $lt: moment().subtract(options.where[prop], 'day').startOf('day').toDate()
                        };
                        break;
                    case 't-':
                        options.where[prop] = {
                            $between: [moment().subtract(options.where[prop], 'day').startOf('day').toDate(), moment().subtract(options.where[prop], 'day').endOf('day').toDate()]
                        };
                        break;
                    case 't':
                        options.where[prop] = {
                            $between: [moment().startOf('day').toDate(), moment().endOf('day').toDate()]
                        };
                        break;
                    case 'w':
                        options.where[prop] = {
                            $between: [moment().startOf('week').toDate(), moment().endOf('week').toDate()]
                        };
                        break;
                    case '>t+':
                        options.where[prop] = {
                            $gt: moment().add(options.where[prop], 'day').startOf('day').toDate()
                        };
                        break;
                    case '<t+':
                        options.where[prop] = {
                            $between: [moment().startOf('day').toDate(), moment().add(options.where[prop], 'day').startOf('day').toDate()]
                        };
                        break;
                    case 't+':
                        options.where[prop] = {
                            $between: [moment().add(options.where[prop], 'day').startOf('day').toDate(), moment().add(options.where[prop], 'day').endOf('day').toDate()]
                        };
                        break;
                }
            }
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

    delete options.where.callback;
    delete options.where._;

    var projects = global.model['projects'],
        issues = global.model['issues'],
        trackers = global.model['trackers'],
        issue_statuses = global.model['issue_statuses'],
        users = global.model['users'],
        priority = global.model['enumerations'],
        custom_values = global.model['custom_values'],
        custom_fields = global.model['custom_fields'],
        time_entries = global.model['time_entries'],
        issue_categories = global.model['issue_categories'];

    //options.attributes = [[sequelize.fn('count', sequelize.col('issues.id')), 'total']]

    options.include = [{
        model: projects,
        required: false,
        attributes: ["id", "identifier", "name"],
        where: {
            'id': {
                $not: null
            }
        }
    }, {
        model: trackers,
        attributes: ["id", "name"]
    }, {
        model: issue_statuses,
        as: 'status',
        where: req.query.where ? req.query.where.status ? req.query.where.status : null : null,
        attributes: ["id", "name", "is_closed"]
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
    }, {
        model: custom_values,
        //where: req.query.where ? req.query.where.custom_values ? req.query.where.custom_values : null : null,
        include: [{
            model: custom_fields
        }]
    }, {
        model: time_entries
    }]

    if (options.order.length == 0)
        options.order = [['id', 'DESC']]

    if (options.where['$status.is_closed$'] != undefined) {
        options.include[2].where = {
            'is_closed': options.where['$status.is_closed$']
        }
        delete options.where['$status.is_closed$'];
    }

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
});

router.get('/:identifier', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: {
                id: req.params.identifier
            }
        };

    if (req.query.where) {
        var where = req.query.where;
        if (where.main) {
            options.where = where.main
            options.where.id = req.params.identifier
        }
    }

    delete options.where.callback;
    delete options.where._;

    var projects = global.model['projects'],
        issues = global.model['issues'],
        trackers = global.model['trackers'],
        issue_statuses = global.model['issue_statuses'],
        users = global.model['users'],
        priority = global.model['enumerations'],
        custom_values = global.model['custom_values'],
        custom_fields = global.model['custom_fields'],
        time_entries = global.model['time_entries'],
        issue_categories = global.model['issue_categories'];

    options.include = [{
        model: projects,
        required: false,
        attributes: ["id", "identifier", "name"]
    }, {
        model: trackers,
        attributes: ["id", "name"]
    }, {
        model: issue_statuses,
        as: 'status',
        attributes: ["id", "name", "is_closed"]
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
    }, {
        model: custom_values,
        where: {
            customized_type: 'Issue'
        },
        include: [{
            model: custom_fields
        }]
    }, {
        model: time_entries
    }]

    db.query("SELECT issue.*, `status`.`name` as `status.status_name`, `journal`.`notes` as `journal.notes` FROM issues as issue left outer join issue_statuses as `status` on status.id = issue.status_id left outer join journals as journal on journal.journalized_id = issue.id where issue.id="+req.params.identifier, {
        type: sequelize.QueryTypes.SELECT,
        raw: true
    })
    .then(data => {
        res.status(200);
        res.jsonp(data);
    })
/*
    issues.findOne(options).then(data => {
        res.status(200);
        res.jsonp(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });*/
});

router.get('/:identifier/issues/:limit?/:offset?', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: {
                '$project.identifier$': req.params.identifier
            }
        };

    if (req.query.orderby)
        options.order = JSON.parse(req.query.orderby)

    if (req.query.groupby) {
        options.attributes = [[sequelize.fn('count', sequelize.col('issues.id')), 'count']]
        options.group = JSON.parse(req.query.groupby)
    }

    if (req.query.where) {
        if (req.query.where.main) {
            options.where = JSON.parse(JSON.stringify(req.query.where.main))
            options.where['$project.identifier$'] = req.params.identifier
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

    delete options.where.callback;
    delete options.where._;

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
        attributes: ["id", "name", "is_closed"]
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
/*
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
});*/

global.notoken.push('/api/issue/total')
global.notoken.push(/\/api\/issue\/list\/\w*/ig)
global.notoken.push(/\/api\/issue\/\w*/ig)

module.exports = router;
