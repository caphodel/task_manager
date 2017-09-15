var
    express = require('express'),
    md5 = require('md5'),
    router = express.Router(),
    sequelize = require("sequelize"),
    valuesToArray = function (obj) {
        var data = []
        for (var key in obj.dataValues) {
            if (obj.dataValues.hasOwnProperty(key)) {
                data.push(obj[key])
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

router.get('/:limit?/:offset?', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: JSON.parse(JSON.stringify(req.query))
        };

    delete options.where.callback;

    if (!req.params.limit) {

    } else {
        options.limit = parseInt(req.params.limit)
    }

    if (!req.params.offset) {

    } else {
        options.offset = parseInt(req.params.offset)
    }

    const users = db.import('../models/projects');

    users.findAll(options).then(data => {
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

module.exports = router;
