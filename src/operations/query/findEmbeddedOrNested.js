const output = require('../../utils/output');

/**
 * match an embebbed/nested document
 *
 * use the query filter document `{ <field>: <value> }` where `<value>` is the document to match
 * @param {*} db
 */
const findByCondition = async db => {
	// get the collection
	const collection = db.collection('inventory');

	// selects all documents where the field size equals the document { h: 14, w: 21, uom: "cm" }
	// Equality matches on the whole embedded document require an exact match of the specified <value> document, including the field order
	// <value> must completely same as the document in the collection and the order of field is important.
	const cursor = await collection
		.find({ size: { h: 14, w: 21, uom: 'cm' } })
		.toArray();

	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findByCondition;
