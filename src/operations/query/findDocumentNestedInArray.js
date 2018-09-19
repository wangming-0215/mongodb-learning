/**
 * Query for a document nested in an array
 *
 * equality matches on the whole nested document required an exact match of specified document,
 * including the field order.
 * @param {*} db
 */
const find = async db => {
	const collection = db.collection('inventory');

	// selects all the documents where an element in the 'instock' array matches the specified document
	const cursor = await collection
		.find({ instock: { warehouse: 'A', qty: 5 } })
		.toArray();
	console.log('Found the following records: ');
	console.log(cursor);
};

module.exports = find;
