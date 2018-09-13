const assert = require('assert');
const output = require('../utils/output');

/**
 * insert a single user
 *
 * @param {*} db
 */
const insertUser = async db => {
	// get the users collection
	const users = db.collection('users');

	// insert a single user like { name: 'wangming', age: '18', hobbies: [] }
	const result = await users.insertOne({
		name: 'wangming',
		age: 18,
		hobbies: ['paly video games']
	});

	assert.equal(result.result.n, 1);
	assert.equal(result.ops.length, 1);
	output('Inserted a user into the collection');
};

module.exports = insertUser;
