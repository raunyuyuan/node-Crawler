import fs from 'fs'

const readStream = fs.createReadStream('src/stream/node.pkg')
const writeStream = fs.createWriteStream('src/stream/node_copy.pkg')

readStream
	.on('data', chunk => {
		if (writeStream.write(chunk) === false) {
			console.log('still cached')
			readStream.pause()
		}
	})
	.on('readable', () => {
		console.log('data readable')
	})

readStream.on('end', () => {
		writeStream.end()
	})
	.on('close', () => {
		console.log('data close')
	})
	.on('error', e => {
		console.log('data read error' + e)
	})

writeStream.on('drain', () => {
	console.log('data drains')
	readStream.resume()
})

// 防止爆仓
