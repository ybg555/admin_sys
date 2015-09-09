var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html'],
//   index: false,
//   maxAge: '1d',
//   redirect: false,
//   setHeaders: function (res, path, stat) {
//     res.set('x-timestamp', Date.now());
//   }
// }
// app.use(express.static('public', options));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.listen(app.get('port'));
// module.exports = app;


/*Access restrict*/
function restrict(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		req.session.error = 'Access denied!';
		res.redirect('/login'); //重定向路径
	}
}

//Enter
app.use(function(req, res, next) {
	restrict(req, res, next);
});

/*Router*/
app.use('/', routes);
app.use('/users', users);

/* Data */
// req.body.data  POST
// req.query.username  GET

/* Server debug*/
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

/*404 debug*/
app.use(function(req, res, next) {
	res.status(404).send('Sorry cant find that!');
});



/*refers
 *cd D:\git\express 
 *node examples/**
*/