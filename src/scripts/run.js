const path = require('path');
const connect = require('../connection');

process.on('unhandledRejection', err => {
	throw err;
});

const arg = process.argv[2];
let fn = null;

if (arg) {
	const scriptPath = path.resolve(__dirname, '../', 'operations', arg);
	fn = require(scriptPath);
}

connect(fn);
