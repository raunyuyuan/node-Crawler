import https from 'https'
import fs from 'fs'

let options = {
	key: fs.readFileSync('ssh_key.pem'), // 私钥
	cert: fs.readFileSync('ssh_cert.pem') // 证书
}

https.createServer(options, (req, res) => {
	res.writeHead(200)
	res.end('Hello Imooc')
})
.listen(8080)