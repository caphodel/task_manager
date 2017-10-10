var
    express = require('express'),
    md5 = require('md5'),
    router = express.Router(),
    jsonQuery = require('json-query'),
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

    options.attributes = [[db.fn('count', db.col('id')), 'total']]

    var custom_values = global.model['custom_values'];

    custom_values.findAll(options).then(data => {
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

            },
            attributes: {

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

    if (req.query.groupby) {
        options.attributes.include = [[db.fn('count', db.col('id')), 'count']]
        options.group = JSON.parse(req.query.groupby)
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

    var custom_values = global.model['custom_values'];

    custom_values.findAll(options).then(data => {
        res.status(200);
        if(req.query.search){
            var ret = jsonQuery('dataValues'+req.query.search, {
                data: data
            })
            if(req.query.saveToGLobal)
                global.save[req.query.saveToGLobal] = ret.value
            res.jsonp(ret.value);
        }
        else
            res.jsonp(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
})

global.notoken.push('/api/custom_value/total')
global.notoken.push('/api/custom_value/list')
global.notoken.push(/\/api\/custom_value\/list\/\w*/ig)

module.exports = router;
