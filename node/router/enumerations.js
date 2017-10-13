var
    express = require('express'),
    md5 = require('md5'),
    router = express.Router();

router.get('/list/:limit?/:offset?', function (req, res) {
    var db = req.app.get("db"),
        options = {
        };

    if (req.query.orderby)
        options.order = JSON.parse(req.query.orderby)

    if (req.query.where) {
        var where = req.query.where;
        if (where.main) {
            options.where = where.main
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

    if (options.where) {
        delete options.where.callback;
        delete options.where._;
    }

    var enumerations = global.model['enumerations'];

    enumerations.findAll(options).then(data => {
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

global.notoken.push('/api/enumeration/list')
global.notoken.push(/\/api\/enumeration\/list\/\w*/ig)
global.notoken.push(/\/api\/enumeration\/\w*/ig)

module.exports = router;
