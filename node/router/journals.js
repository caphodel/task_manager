var
    express = require('express'),
    md5 = require('md5'),
    router = express.Router(),
    valuesToArray = function (obj) {
        var data = []
        for (var key in obj.dataValues) {
            if (obj.dataValues.hasOwnProperty(key)) {
                data.push(obj[key])
            }
        }
        return data;
    };

router.get('/list/:limit?/:offset?', function (req, res) {
    var db = req.app.get("db"),
        options = {

        };

    if (req.query.where) {
        var where = req.query.where;
        if (where.main) {
            options.where = where.main
        }
    }

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

    var users = global.model['users'],
        journals = global.model['journals'],
        journal_details = global.model['journal_details'],
        custom_fields = global.model['custom_fields'];

    options.include = [{
        model: users,
        attributes: ['id', [db.fn('CONCAT', db.col("user.firstname"), " ", db.col("user.lastname")), "fullname"]]
    }, {
        model: journal_details,
        include: [{
            model: custom_fields/*,
            attributes: ['id', 'name', 'field_format', 'possible_values']*/
        }]
    }]

    journals.findAll(options).then(data => {
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

global.notoken.push(/\/api\/\journal\/\list/ig)
global.notoken.push(/\/api\/\journal\/\list\/\w*/ig)

module.exports = router;
