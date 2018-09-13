const assert = require('assert');
const output = require('../../utils/output');
const data = require('../../utils/data');
/**
 * insert multiple users into the collection
 *
 * @param {*} db
 */
const insertInventories = async db => {
	// get the users collection
	const collection = db.collection('inventory');

	// insert multiple users into the collection by using `insertMany` method
	const result = await collection.insertMany(data);
	assert.equal(result.result.n, data.length);
	assert.equal(result.ops.length, data.length);
	output('Inserted 2 users into the collection');
};

module.exports = insertInventories;
