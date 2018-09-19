/**
 * Using the array index to query for a field in the embedded document
 *
 * using the dot notation, you can specify query conditions for field in a document
 * at a particular index or position of the array.
 * @param {*} db
 */
module.exports = async db => {
	const collection = db.collection('inventory');

	// select all documents where the 'instock' array has a document that contains the field 'qty'
	// whose value is less than or equal to 20 as its first element.
	const cursor = await collection
		.find({ 'instock.0.qty': { $lte: 20 } })
		.toArray();

	console.log('Found the following records: ');
	console.log(JSON.stringify(cursor, null, ' '));
};
