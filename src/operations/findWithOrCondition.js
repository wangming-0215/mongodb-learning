const output = require('../utils/output');

/**
 * specify `OR` condition
 *
 * retrieves all documents in collection where the name equals 'wangming' or age is less than 20
 * @param {*} db
 */
const findUsersBySpecifyNameOrAge = async db => {
	// get the users collection
	const users = db.collection('users');

	// retrieves all documents in collection where name equals 'wangming' or age is less than 20
	const cursor = await users
		.find({
			$or: [{ name: 'wangming' }, { age: { $lt: 20 } }]
		})
		.toArray();

	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findUsersBySpecifyNameOrAge;
