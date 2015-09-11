var config = require('./conf/config.js');
var express = require('express');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var favicon = require('express-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var useragent = require('express-useragent');
var router_api = require('./routes/api');
var login = require('./lib/login');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use('/pub_res', express.static(path.join(__dirname, 'pub_res')));
// app.use(favicon(path.join(__dirname, 'pub_res/favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(useragent.express());//User Agent解析,判断是否是手机,爬虫等

/*Access restrict*/
app.use(function(req, res, next) {
	login.restrict(req, res, next);
});

/*Router*/
app.use('/', router_api);

/* Server debug*/
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

/*404 debug*/
app.use(function(req, res, next) {
	res.status(404).send('Sorry cant find that!');
});

server = app.listen(app.get('port'), function() {
	console.log('%s Listening on port %d', moment().format('YYYY-MM-DD HH:mm:ss'), server.address().port);
});

module.exports = app;