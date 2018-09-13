const output = require('../../utils/output');

/**
 * query on nested field
 *
 * use dot notation (field.nestedField) to specify a query condition on field in an embebbed/nested document
 *
 * @param {*} db
 */
const findByCondition = async db => {
	const collection = db.collection('inventory');

	// selects all documents where the field `uom` nested in the field `size` equals 'in'
	const cursor = await collection.find({ 'size.uom': 'in' }).toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findByCondition;
