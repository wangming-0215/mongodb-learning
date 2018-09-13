const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const output = require('../utils/output');

module.exports = async function(fn) {
	try {
		// connect to mongodb server
		const client = await MongoClient.connect(config.MONGODB_URL);
		output('connected successfully to server');
		console.log('-------------------------------');
		// create database if it's not exists
		const db = await client.db(config.DBNAME);
		// execute operations
		await fn(db);
		// close the database
		client.close();
	} catch (err) {
		throw err;
	}
};
