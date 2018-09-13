const output = require('../utils/output');

/**
 * specify `AND` condition
 *
 * retrieves all documents in the collection where the status equals "A" and qty is less than ($lt) 30
 * @param {*} db
 */
const findWithCondition = async db => {
	// get the inventory collection
	const collection = db.collection('inventory');

	// retrieves all documents in the collection where the status equals "A" and qty is less than ($lt) 30
	// Just like: `SELECT * FROM inventory WHERE status = "A" AND qty < 30`
	const cursor = await collection
		.find({ status: 'A', qty: { $lt: 30 } })
		.toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findWithCondition;
