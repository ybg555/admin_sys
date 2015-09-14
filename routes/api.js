var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var filePath = __dirname.replace('routes', 'templates');
// var options = {
// 	root: filePath + 'templates/1/',
// 	dotfiles: 'deny',
// 	headers: {
// 		'x-timestamp': Date.now(),
// 		'x-sent': true
// 	}
// };

// router.use(function(req, res, next) {
// 	console.log('all request must across login');
// 	next();
// });

router.use('/:module/:action?', function(req, res, next) {
	var module = req.params.module;
	var action = req.params.action ? req.params.action : 'index';
	console.log(module, action, 1);
	// var data = {
	// 	title: "恒大互联网社区中心"，
	// 	autho: "Blade",
	// 	desp: "hbs模板引擎测试案例"
	// };
	// var data = fs.readFileSync(filePath + 'data/index.js', 'utf-8');
	// console.log(typeof JSON.parse(str)); //字符串解析成json有问题
	// console.log(typeof JSON.stringify(str)); //json解析成字符串正常
	res.render(filePath + '/head/' + module + '.' + action + '.hbs', {
		haveIf: true,
		arr: [{
			a: "a",
			data: "___a"
		}, {
			a: "b",
			data: "___b"
		}, {
			a: "c",
			data: "___c"
		}],
		test: [{
			condition: true,
			direct: "打印dir"
		}, {
			condition: false,
			direct: "dir",
			inverse: "打印inverse"
		}]
	});
});

router.use('/', function(req, res, next) {
	console.log(filePath);
	var module = req.params.module ? req.params.module : 'login';
	var action = req.params.action ? req.params.action : 'index';
	console.log(module, action, 2);
	res.render(filePath + '/head/' + module + '.' + action + '.hbs');
});

module.exports = router;