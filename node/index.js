var Sequelize = require("sequelize"),
	express = require("express"),
	bodyParser = require("body-parser"),
	jwt = require('express-jwt'),
	app = express(),
	router = express.Router();

var sequelize = new Sequelize('tame', 'root', 'asdfghjkl', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	define: {
		timestamps: false
	}
})

app.set("db", sequelize);
app.set("salt", ":tame:");

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/api', jwt({
	secret: app.get("salt"),
	getToken: function fromHeaderOrQuerystring(req) {
		var token = req.cookies && req.cookies.access_token || req.body.access_token || req.query.access_token || req.headers['x-access-token'];
		console.log("aaa", token)
		if (token) {
			return token;
		}
		
		return null;
	}
}).unless({
	path: ['/api/auth']
}));

/* router */
var rUser = require('./router/users');
router.use('/user', rUser);

var rAuth = require('./router/auth');
router.use('/auth', rAuth);

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
