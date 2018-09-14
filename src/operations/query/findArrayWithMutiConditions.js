const output = require('../../utils/output');

/**
 * Specify Mutiple conditions for array elements
 *
 * You can specify the query such that either a single array element meets these condition
 * or any combination of array elements meets the conditions
 * @param {*} db
 */
const findByCondition = async db => {
	const collection = db.collection('inventory');

	// query an array with compound filter conditions on the array elements
	// queries for documents where the dim_cm array contains elements that in some combination satisfy the query conditions
	const cursor1 = await collection
		.find({ dim_cm: { $gt: 15, $lt: 20 } })
		.toArray();

	output('Found the following records: ');
	console.log(cursor1);
};

module.exports = findByCondition;
