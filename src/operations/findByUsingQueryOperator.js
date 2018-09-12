const output = require('../utils/output');

/**
 * specify condition by using query operators
 *
 * `{ <field1>: { <operator1>: <value1> } }`
 *
 * retrieves all documents from the `users` collection where age equals either 18 or 21
 *
 * @param {*} db
 */
const findUsersBySpecifyAge = async db => {
	// get the users collection
	const users = db.collection('users');

	// retrieves all document from the users collection where age equals either 18 or 21
	// just like: `SELECT * FROM users WHERE age in (18, 21)`
	const cursor = await users.find({ age: { $in: [18, 21] } }).toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findUsersBySpecifyAge;
