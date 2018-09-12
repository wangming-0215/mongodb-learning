const chalk = require('chalk');

/**
 * print the message on the console window.
 * @param {*} message
 */
module.exports = function(message) {
	const output = chalk.black.bgGreen(message);
	console.log(output);
};
