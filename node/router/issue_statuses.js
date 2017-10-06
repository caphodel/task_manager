var
    express = require('express'),
    md5 = require('md5'),
    router = express.Router();

router.get('/:status_id?', function (req, res) {
    var db = req.app.get("db"),
        options = {
            where: {
                id: req.params.status_id.indexOf(',') > -1 ? req.params.status_id.split(',') : req.params.status_id
            }
        };

    delete options.where.callback;
    delete options.where._;

    var issue_statuses = global.model['issue_statuses'];

    if (req.params.status_id.indexOf(',') > -1)
        issue_statuses.findAll(options).then(data => {
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
        issue_statuses.findOne(options).then(data => {
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

global.notoken.push(/\/api\/status\/\w*/ig)

module.exports = router;
