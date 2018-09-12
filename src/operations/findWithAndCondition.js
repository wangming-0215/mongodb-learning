const output = require('../utils/output');

/**
 * specify `AND` condition
 *
 * retrieves all documents in the users collection where the name equals 'xiaoming' and age is less than 20
 * @param {*} db
 */
const findUsersBySpecifyNameAndAge = async db => {
	// get the users collection
	const users = db.collection('users');

	// retrieves all documents in the users collection where the name equals 'xiaoming' and age is less than 20
	// Just like: `SELECT * FROM users WHERE name = 'xiaoming' AND age < 20`
	const cursor = await users
		.find({ name: 'xiaoming', age: { $lt: 20 } })
		.toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findUsersBySpecifyNameAndAge;
