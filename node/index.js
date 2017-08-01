var Sequelize = require("sequelize"),
	express = require("express"),
	bodyParser = require("body-parser"),
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

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

/* router */
var users = require('./router/users');
router.use('/users', users);

app.use('/api', router);

app.listen(8080, function () {
  console.log('Server running on port 8080!')
})