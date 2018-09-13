const output = require('../../utils/output');

/**
 * specify `OR` condition
 *
 * retrieves all documents in collection where the status equals 'A' or qty is less than 30
 * @param {*} db
 */
const findWithCondition = async db => {
	// get the collection
	const collection = db.collection('inventory');

	// retrieves all documents in collection where status equals 'A' or qty is less than 30
	// just like `SELECT * FROM users WHERE status = "A" OR qty < 30`
	const cursor = await collection
		.find({
			$or: [{ status: 'A' }, { qty: { $lt: 30 } }]
		})
		.toArray();

	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findWithCondition;
