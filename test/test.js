let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../node/index');
let should = chai.should();

chai.use(chaiHttp);

var token = "";

describe('Auth', () => {
	describe('/POST api/auth', () => {
		it('it should POST login info and get token for authentication', (done) => {
			chai.request(server)
				.post('/api/auth')
				.send({
					'username': 'dlputro',
					'password': 'dlputro123'
				})
				.end((err, res) => {
					token = res.body.token
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success').equal(true);
					res.body.should.have.property('message').and.a('string');
					res.body.should.have.property('token').and.a('string');
					done();
				});
		});
	});
});

describe('Users', () => {
	var user_id = 0
	describe('/PUT api/user', () => {
		it('it should PUT a user', (done) => {
			chai.request(server)
				.put('/api/user')
				.set("x-access-token", token)
				.send({
					'login': 'user test',
					'password': 'password123',
					'firstname': 'user',
					'lastname': 'test'
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.id.should.exist;
					res.body.should.be.a('object');
					done();
					//console.log("User \""+res.body.login+"\" created with id of "+res.body.id)
					user_id = res.body.id
				});
		});
	});

	describe('/GET api/user', () => {
		it('it should GET all the users', (done) => {
			chai.request(server)
				.get('/api/user')
				.set("x-access-token", token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.not.eql(0);
					done();
				});
		});
	});

	describe('/GET api/user', () => {
		it('it should GET one user', (done) => {
			chai.request(server)
				.get('/api/user')
				.set("x-access-token", token)
				.query({
					'id': user_id
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.equal(1);
					done();
				});
		});
	});

	describe('/POST api/user', () => {
		it('it should POST a change to user firstname', (done) => {
			chai.request(server)
				.post('/api/user')
				.set("x-access-token", token)
				.send({
					'id': user_id,
					'firstname': 'user change'
				})
				.end((err, res) => {
					//console.log(res.body)
					/*res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(1);*/
					done();
				});
		});
	});

	describe('/DELETE api/user', () => {
		it('it should DELETE one user', (done) => {
			chai.request(server)
				.delete('/api/user')
				.set("x-access-token", token)
				.send({
					'id': user_id
				})
				.end((err, res) => {
					//console.log(res.body)
					/*res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(1);*/
					done();
				});
		});
	});
});

/*var client = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'firefox'
    }
});

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = client.transferPromiseness;*/

/* UI testing */
let WebDriverIO = require('webdriverio');
let browser = WebDriverIO.remote({
	baseUrl: 'https://127.0.0.1', // Or other url, e.g. localhost:3000
	host: 'localhost', // Or any other IP for Selenium Standalone
	port: 4444,
	waitforTimeout: 120 * 1000,
	logLevel: 'silent',
	screenshotPath: `${__dirname}/../screenshots/`,
	desiredCapabilities: {
		browserName: /*process.env.SELENIUM_BROWSER || */ 'firefox',
	},
});

/*var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

chaiAsPromised.transferPromiseness = browser.transferPromiseness;*/

describe('Load main page', function () {

	before(function () {
		return browser.init().url('http://localhost/task_manager/')
	});

	it('Load main page', function () {
		return browser.getTitle().then(function (title) {
			title.should.be.eql("Task Manager")
			// outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
		})
		/*.click("#red-sign-in")
					.waitForExist("#red-form-login", 5000)
					.setValue('#red-form-login #username input', 'test')*/
	});

	it('Trying to login', function () {
		return browser.click("#red-sign-in")
			.waitForExist("#red-form-login", 5000)
			.setValue('#red-form-login #username input', 'dlputro')
			.setValue('#red-form-login #password input', 'dlputro123')
			.click("#red-btn-login")
			.waitUntil(function () {
				return this.getText('#red-sign-in', function(err, text) {
                        return text !== 'Sign In';
                    });
			}).then(function () {
			})
			.execute(function () {
				return window.red_token;
			})
			.then(function (result) {
				console.log(result)
				result.should.not.eql("");
			})
			.end();
	});

	/*it('Check if login success', function () {
		var token = "";
		return browser.execute(function() {
			
		});
	});*/
});
