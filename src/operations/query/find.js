const output = require('../../utils/output');

/**
 * select all documents in the collection
 *
 * Pass an empty document as the query filter parameter to `find` method
 * @param {*} db
 */
const findAll = async db => {
	// get the inventory collection
	const collection = db.collection('inventory');

	// select all documents in the collection
	// just like `SELECT * From inventory`
	const cursor = await collection.find({}).toArray();
	output('Found the following records');
	console.log(cursor);
};

module.exports = findAll;
