import EventEmitter from 'events'

let life = new EventEmitter()

life.setMaxListeners(11)

life.on('求安慰', who => {
	console.log(`给 ${who} 揉肩`)
})

life.emit('求安慰', '汉子')
console.log(EventEmitter.listenerCount(life, '求安慰'))