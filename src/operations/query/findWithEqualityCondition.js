const output = require('../../utils/output');

/**
 * selects from the `inventory` collection all documents where the `staus` equals 'A'
 *
 * To specify equality condition, use `<field>:<value>` expressions in the query filter document
 * @param {*} db
 */
const findWithCondition = async db => {
	// get the inventory collection
	const collection = db.collection('inventory');

	// selects all documents where the status equals "A" from the collection
	// just like `SELECT * FROM inventory WHERE status = "A"`
	const cursor = await collection.find({ status: 'A' }).toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findWithCondition;
