var
    express = require('express'),
    md5 = require('md5'),
    router = express.Router(),
    bodyParser = require('body-parser'),
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
    var db = req.app.get("db"),
        options = {
            where: {

            }
        };

    if (req.query.orderby)
        options.order = JSON.parse(req.query.orderby)

    if (req.query.where){
        var where = req.query.where;
        if(where.main){
            options.where = where.main
        }
    }

    delete options.where.callback;
    delete options.where._;

    var watchers = global.model['watchers']/*,
        issues = global.model['issues'];*/

    options.attributes = [[sequelize.fn('count', sequelize.col('watchers.id')), 'total']]

    options.include = [/*{
        model: issues,
        required: false,
        attributes: ["id"]
    }*/]

    watchers.findAll(options).then(data => {
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

        };

    if (req.query.where){
        var where = req.query.where;
        if(where.main){
            options.where = where.main
        }
    }

    if (req.query.orderby)
        options.order = JSON.parse(req.query.orderby)

    if (!req.params.limit) {

    } else {
        options.limit = parseInt(req.params.limit)
    }

    if (!req.params.offset) {

    } else {
        options.offset = parseInt(req.params.offset)
    }

    var watchers = global.model['watchers'],
        /*issues = global.model['issues'],*/
        users = global.model['users'];

    options.include = [{
        model: users,
        attributes: ["id", [db.fn('CONCAT', db.col("user.firstname"), " ", db.col("user.lastname")), "name"]]
    }]

    watchers.findAll(options).then(data => {
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

global.notoken.push('/api/watcher/total')
global.notoken.push(/\/api\/watcher\/list/)
global.notoken.push(/\/api\/watcher\/list\/\w*/ig)
//global.notoken.push(/\/api\/watcher\/\w*/ig)

module.exports = router;
