const output = require('../utils/output');

/**
 * specify condition by using query operators
 *
 * `{ <field1>: { <operator1>: <value1> } }`
 *
 * retrieves all documents from the `inventory` collection where status equals either "A" or "D"
 *
 * @param {*} db
 */
const findWithCondition = async db => {
	// get the inventory collection
	const collection = db.collection('inventory');

	// retrieves all documents from the `inventory` collection where status equals either "A" or "D"
	// just like: `SELECT * FROM inventory WHERE age in ("A", "D")`
	const cursor = await collection
		.find({ status: { $in: ['A', 'D'] } })
		.toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findWithCondition;
