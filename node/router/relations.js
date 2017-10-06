var
    express = require('express'),
    md5 = require('md5'),
    router = express.Router();

router.get('/:issue_id?', function (req, res) {
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
        res.jsonp(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
});

global.notoken.push(/\/api\/relation\/\w*/ig)

module.exports = router;
