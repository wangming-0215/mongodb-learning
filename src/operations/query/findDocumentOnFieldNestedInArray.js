/**
 * specify a query condition on a field embedded in an array of documents
 *
 * if you don't know the index position of the document nested in the array,
 * concatenate the name of the array field with dot (.) and the name of the field in the nested document.
 * @param {*} db
 */
module.exports = async db => {
	const collection = db.collection('inventory');

	// selects all documents where the 'instock' array has at least one embedded document
	// that contains the field 'qty' whose value is less than or equal to 20.
	const cursor = await collection
		.find({ 'instock.qty': { $lte: 20 } })
		.toArray();

	console.log('Found the following records: ');
	console.log(JSON.stringify(cursor, null, '  '));
};
