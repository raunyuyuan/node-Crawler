import fs from 'fs'

let readStream = fs.createReadStream('src/stream/index.js')
let n = 0
readStream
	.on('data', chunk => {
		console.log(Buffer.isBuffer(chunk))
		n++
		console.log('data emits')
		// console.log(chunk.toString('utf8'))

		readStream.pause()
		console.log('data pause')
		setTimeout(()=>{
			console.log('data pause end')
			readStream.resume()
		}, 3000)
	})
	.on('readable', () => {
		console.log('data readable')
	})
	.on('end', () => {
		console.log(n)
		console.log('data ends')
	})
	.on('close', () => {
		console.log('data close')
	})
	.on('error', e => {
		console.log('data read error' + e)
	})