// buffer的存在主要为了处理二进制数据的缓存区
// 对应c++
import fs from 'fs'
fs.readFile('src/buffer/hsy.jpeg', (err, origin_buffer) => {
	console.log(Buffer.isBuffer(origin_buffer))

	fs.writeFile('src/buffer/hsybeautiful.jpeg', origin_buffer, err => {
		if (err) console.log(err)
	})

	let base64Image = origin_buffer.toString('base64')

	let decodedImage = new Buffer(base64Image, 'base64')

	console.log(Buffer.compare(origin_buffer, decodedImage))

	fs.writeFile('src/buffer/hsy_decoded.jpeg', decodedImage, err => {
		if (err) console.log(err)
	})
})
