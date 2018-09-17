const output = require('../../utils/output');

/**
 * Use the '$size' operator to query for arrays by number of elements
 * @param {*} db
 */
const findByCondition = async db => {
	const collection = db.collection('inventory');

	// selects documents where the array tags has 3 elements
	const cursor = await collection.find({ tags: { $size: 3 } }).toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findByCondition;
