var request = require('request');

/*module.id 模块的识别符，通常是带有绝对路径的模块文件名。
module.filename 模块的文件名。
module.loaded 返回一个布尔值，表示模块是否已经完成加载。
module.parent 返回一个对象，表示调用该模块的模块。
module.children 返回一个数组，表示该模块要用到的其他模块。*/

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
			res.session = 'Access denied!';
			res.render(__dirname + '/templates/1/login.index.hbs', {
				'title': '恒大互联网社区中心',
				'author': 'Blade',
				'datalist': {

				}
			}); //重定向路径
		}
	}
};

module.exports = login;