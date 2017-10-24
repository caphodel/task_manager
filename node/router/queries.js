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

router.get('/query/:limit?/:offset?', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: {

            }
        };

    if (req.query.where) {
        var where = req.query.where;
        if (where.main) {
            options.where = where.main
        }
    }

    if (req.query.orderby)
        options.order = JSON.parse(req.query.orderby)

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

    var queries = global.model['queries'];

    queries.findAll(options).then(data => {
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

router.get('/:query_id?', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: {
                id: req.params.query_id
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

    var queries = global.model['queries'];

    if (req.params.query_id.indexOf(',') > -1)
        queries.findAll(options).then(data => {
            res.status(200);
            res.jsonp(data);
        }).catch(function (error) {
            res.status(500);
            res.jsonp({
                error: error,
                stackError: error.stack
            });
        });
    else
        queries.findOne(options).then(data => {
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

global.notoken.push('/api/query/list')
global.notoken.push(/\/api\/query\/list\/\w*/ig)
global.notoken.push(/\/api\/\query\/\w*/ig)

module.exports = router;
