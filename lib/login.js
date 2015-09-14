var request = require('request');
var filePath = __dirname.replace('lib', '');

var login = {
	restrict: function(req, res, next) {
		if (req.session) {
			next();
			console.log('扫描完毕，通过吧，骚年~');
		} else {
			var reqUrl = 'http://hotel.qunar.com/price/detail.jsp?fromDate=2012-08-18&toDate=2012-08-19&cityurl=shanghai_city&HotelSEQ=shanghai_city_2856&cn=5';
			request({
				uri: reqUrl
			}, function(err, response, body) {
				var filePath = __dirname + '/data/data.js';
				if (fs.exists(filePath)) {
					fs.unlinkSync(filePath);

					console.log('Del file ' + filePath);
				}

				fs.writeFile(filePath, body, 'utf-8');
			});

			console.log('登记后才能进去玩~~');
			// res.session = 'Access denied!';
			res.render(filePath + '/templates/head/login.index.hbs', {
				'title': '恒大互联网社区中心',
				'author': 'Blade',
				'datalist': {

				}
			});
		}
	}
};

module.exports = login;