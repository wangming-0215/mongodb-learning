const output = require('../utils/output');

/**
 * selects from the `users` collection all documents where the `name` equals to 'wangming'
 *
 * To specify equality condition, use `<field>:<value>` expressions in the query filter document
 * @param {*} db
 */
const findUsersBySpecifyName = async db => {
	// get the users collection
	const users = db.collection('users');

	// selects all documents where the name equals to wangming from the users collection
	// just like `SELECT * FROM users WHERE name = 'wangming'`
	const cursor = await users.find({ name: 'wangming' }).toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findUsersBySpecifyName;
