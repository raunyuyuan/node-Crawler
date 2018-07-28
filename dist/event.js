'use strict';

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let life = new _events2.default();

life.setMaxListeners(11);

life.on('求安慰', who => {
	console.log(`给 ${who} 揉肩`);
});

life.emit('求安慰', '汉子');
console.log(_events2.default.listenerCount(life, '求安慰'));