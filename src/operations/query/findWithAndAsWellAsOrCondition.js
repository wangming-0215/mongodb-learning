const output = require('../../utils/output');

/**
 * Specify `AND` as well as `OR` condition
 *
 * selects all doucments in the collection where the status equals "A" and either qty is less than ($lt) 30 or item starts with the character p
 * @param {*} db
 */
const findWithCondition = async db => {
	// get the inventory collection
	const collection = db.collection('inventory');

	// selects all documents in the collection where the status equals "A" and either qty is less than ($lt) 30 or item starts with the character p
	// just like `SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")`
	const cursor = await collection
		.find({
			staus: 'A',
			$or: [{ qty: { $lt: 30 } }, { item: { $regex: '^p' } }]
		})
		.toArray();

	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findWithCondition;
