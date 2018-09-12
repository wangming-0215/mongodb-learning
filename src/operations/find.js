const output = require('../utils/output');

/**
 * select all documents in the collection
 *
 * Pass an empty document as the query filter parameter to `find` method
 * @param {*} db
 */
const findAll = async db => {
	// get the users collection
	const users = db.collection('users');

	// select all documents in the collection
	// just like `SELECT * from USERS`
	const result = await users.find({}).toArray();
	output('Found the following records');
	console.log(result);
};

module.exports = findAll;
