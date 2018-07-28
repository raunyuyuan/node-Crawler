'use strict';

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let options = {
	key: _fs2.default.readFileSync('ssh_key.pem'), // 私钥
	cert: _fs2.default.readFileSync('ssh_cert.pem') // 证书
};

_https2.default.createServer(options, (req, res) => {
	res.writeHead(200);
	res.end('Hello Imooc');
}).listen(8080);