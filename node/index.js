var Sequelize = require("sequelize"),
    express = require("express"),
    bodyParser = require("body-parser"),
    jwt = require('express-jwt'),
    app = express(),
    router = express.Router(),
    cors = require('cors'),
    fs = require('fs'),
    winston = require('winston');

var logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' })
  ]
});

var sequelize = new Sequelize('tame', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false,
        underscored: true
    },
    logging: (msg) => logger.info(msg)
})

app.use(cors());
global.db = sequelize;
app.set("db", sequelize);
app.set("salt", ":tame:");

global.notoken = []
global.model = {}
global.save = {}

const modelFolder = './models/';

fs.readdirSync(modelFolder).forEach(file => {
    file = file.replace('.js', '')
    if (['all_assign_historical', 'all_done_ratio_historical', 'closeddate', 'done_ratio_historical', 'show_create_triggers', 'statuschange', 'due_date_datalastweek', 'due_date_datathisweek', 'due_date_percentage', 'due_date_percentage_el', 'due_date_tmp', 'tmpassign', 'tmpd', 'tmpdatasrminternal', 'tmpfs', 'tmpi', 'tmpinternal', 'tmpinternalall', 'tmpinternalsrmall', 'tmpm', 'tmpsrm', 'tmpsrmall'].indexOf(file) == -1)
        global.model[file] = db.import('./models/' + file)
})

//load relations
require('./relations')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api', jwt({
    secret: app.get("salt"),
    getToken: function fromHeaderOrQuerystring(req) {
        var token = req.cookies && req.cookies.access_token || req.body.access_token || req.query.access_token || req.headers['x-access-token'];

        if (token) {
            return token;
        }

        return null;
    }
}).unless({
    path: global.notoken
}));

/* router */
var rUser = require('./router/users');
router.use('/user', rUser);

var rAuth = require('./router/auth');
router.use('/auth', rAuth);

var rProject = require('./router/projects');
router.use('/project', rProject);

var rIssues = require('./router/issues');
router.use('/issue', rIssues);

var rWatchers = require('./router/watchers');
router.use('/watcher', rWatchers);

var rUserPreferences = require('./router/user_preferences');
router.use('/user_preference', rUserPreferences);

var rRoles = require('./router/roles');
router.use('/role', rRoles);

var rJounals = require('./router/journals');
router.use('/journal', rJounals);

var rAllIssueRelation = require('./router/relations');
router.use('/relation', rAllIssueRelation);

var rIssueStatuses = require('./router/issue_statuses');
router.use('/status', rIssueStatuses);

var rCustomFields = require('./router/custom_fields');
router.use('/custom_field', rCustomFields);

var rCustomValues = require('./router/custom_values');
router.use('/custom_value', rCustomValues);

var rTrackers = require('./router/trackers');
router.use('/tracker', rTrackers);

var rEnumerations = require('./router/enumerations');
router.use('/enumeration', rEnumerations);

var rQueries = require('./router/queries');
router.use('/query', rQueries);

app.use('/api', router);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

app.listen(8080, function () {
    console.log('Server running on port 8080!')
})

module.exports = app;
