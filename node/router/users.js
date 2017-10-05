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

    var users = global.model['users'];

    users.create(req.body).then(function (data) {
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
        res.jsjsonpon(data);
    }).catch(function (error) {
        res.status(500);
        res.jsonp({
            error: error,
            stackError: error.stack
        });
    });
});

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

    const users = db.import('../models/users');

    users.findAll({
        where: options
    }).then(data => {
        for (var i=0;i<data.length;i++){
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

router.get('/:user_id?', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: {
                id: req.params.user_id
            }
        };

    delete options.where.callback;
    delete options.where._;

    var users = global.model['users'];

    options.attributes = [{ all: true }, [db.fn('CONCAT', db.col("firstname"), " ", db.col("lastname")), "fullname"]]

    users.findOne(options).then(data => {
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

global.notoken.push(/\/api\/\user\/\w*/ig)

module.exports = router;
