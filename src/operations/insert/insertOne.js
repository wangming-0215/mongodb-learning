const assert = require('assert');
const output = require('../../utils/output');
const data = require('../../utils/data');

/**
 * insert a single document
 *
 * @param {*} db
 */
const insertInventory = async db => {
	// get the collection
	const collection = db.collection('inventory');

	// insert a single document
	const inventory = data[0];
	inventory.dim_cm.push(25);
	const result = await collection.insertOne(inventory);

	assert.equal(result.result.n, 1);
	assert.equal(result.ops.length, 1);
	output('Inserted a user into the collection');
};

module.exports = insertInventory;
