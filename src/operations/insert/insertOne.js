const assert = require('assert');
const output = require('../../utils/output');
const data = require('../../utils/data');

/**
 * insert a single user
 *
 * @param {*} db
 */
const insertInventory = async db => {
	// get the users collection
	const collection = db.collection('inventory');

	// insert a single user like { name: 'wangming', age: '18', hobbies: [] }
	const result = await collection.insertOne(data[0]);

	assert.equal(result.result.n, 1);
	assert.equal(result.ops.length, 1);
	output('Inserted a user into the collection');
};

module.exports = insertInventory;
