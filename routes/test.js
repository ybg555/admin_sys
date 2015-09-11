var express = require('express');
var router = express.Router();
var filePath = __dirname.replace('routes', '');
var options = {
	root: filePath + 'templates/1/',
	dotfiles: 'deny',
	headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	}
};

// router.use(function(req, res, next) {
// 	console.log('all request must across login');
// 	next();
// });

router.use('/:module/:action?', function(req, res, next) {
	var module = req.params.module;
	var action = req.params.action ? req.params.action : 'index';
	console.log(module, action, 1);
	res.sendFile(module + '.' + action + '.html', options, function(err) {
		if (err) {
			res.status(err.status).send('URL错误').end();
		}
	});
});

router.use('/', function(req, res, next) {
	var module = req.params.module ? req.params.module : 'login';
	var action = req.params.action ? req.params.action : 'index';
	console.log(module, action, 2);
	res.sendFile(module + '.' + action + '.html', options, function(err) {
		if (err) {
			res.status(err.status).send('URL错误').end();
		}
	});
});

module.exports = router;