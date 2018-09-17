const output = require('../../utils/output');

/**
 * Query for an Array Element by the Array Index Position
 *
 * Using 'dot notation', you can specify query condition for an element at a particular index or position of the array.
 * @param {*} db
 */
const findByCondition = async db => {
	const collection = db.collection('inventory');

	// queries for all documents where the second element in the array 'dim_cm' is greater than 25
	const cursor = await collection.find({ 'dim_cm.1': { $gt: 25 } }).toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findByCondition;
