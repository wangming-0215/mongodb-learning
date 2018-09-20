/**
 * A single nested document meets multiple query conditions on nested field
 *
 * use '$elemMatch' operator to specify multiple criteria on an array of embedded documents
 * such that at least one embedded document satisfies all the specified criteria
 * @param {*} db
 */
module.exports = async db => {
	const collection = db.collection('inventory');

	// queries for documents where the instock array has at least one embedded document
	// that contains both the field qty equals to 5 and the field warehouse equals to A
	const cursor1 = await collection
		.find({
			instock: { $elemMatch: { qty: 5, warehouse: 'A' } }
		})
		.toArray();
	console.log('Found the following records: ');
	console.log(cursor1);

	// queries for document where the instock array has at least one embedded document that
	// contains the field qty that is greater than 10 and less than or equal to 20:
	const cursor2 = await collection
		.find({
			instock: { $elemMatch: { qty: { $gt: 10, $lte: 20 } } }
		})
		.toArray();

	console.log('Found the following records: ');
	console.log(cursor2);
};
