const assert = require('assert');
const output = require('../utils/output');
/**
 * insert multiple users into the collection
 *
 * @param {*} db
 */
const insertUsers = async db => {
	// get the users collection
	const users = db.collection('users');

	const data = [
		{
			name: 'wangming',
			age: 21,
			hobbies: ['play video games']
		},
		{
			name: 'xiaoming',
			age: 18,
			hobbies: ['reading books']
		}
	];

	// insert multiple users into the collection by using `insertMany` method
	const result = await users.insertMany(data);
	assert.equal(result.result.n, 2);
	assert.equal(result.ops.length, 2);
	output('Inserted 2 users into the collection');
};

module.exports = insertUsers;
