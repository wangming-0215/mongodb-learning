const output = require('../../utils/output');

/**
 * Query for an Array Element that Meets Multiple Criteria
 *
 * use `$elemMatch` operator to specify multiple criteria on the element of an array
 * such that at least on array element satisfies all the specified criteria.
 * @param {*} db
 */
const findByCondition = async db => {
	const collection = db.collection('inventory');

	// queries for documents where the `dim_cm` array contains at least one element
	// that is both greater than 22 and less than 30
	const cursor = await collection
		.find({
			dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } }
		})
		.toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findByCondition;
