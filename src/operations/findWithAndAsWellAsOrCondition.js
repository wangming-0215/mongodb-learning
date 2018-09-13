const output = require('../utils/output');

/**
 * Specify `AND` as well as `OR` condition
 *
 * selects all doucments in the collection where the name equals 'wangming' and either age is less than 27 or hobbies contains 'play video games'
 * @param {*} db
 */
const findUsersBySpecifyNameAndAgeOrHobbies = async db => {
	// get the users collection
	const users = db.collection('users');

	// selects all documents in the collection where the name equals 'wangming' and either age is less than 27 or hobbies contains 'play video games'
	// just like `SELECT * FROM users WHERE name = 'wangming' AND (age < 27 or item LIKE 'p%')
	const cursor = await users
		.find({
			name: 'wangming',
			$or: [{ age: { $lt: 25 } }, { hobbies: 'play video games' }]
		})
		.toArray();

	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findUsersBySpecifyNameAndAgeOrHobbies;
