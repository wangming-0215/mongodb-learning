const output = require('../../utils/output');

/**
 * match an array
 *
 * To specify equality condition on an array, use the query document `{ <field>: <value>}`
 * where <value> is the exact array to match, including the order of the elements.
 * @param {*} db
 */
const findByCondition = async db => {
	const collection = db.collection('inventory');

	// selects all documents where the field tags value is an array with exactly two element, 'red' and 'blank',
	// in the specify order.
	const cursor1 = await collection.find({ tags: ['red', 'blank'] }).toArray();
	output('Found the follow records that are exactly match to the condition: ');
	console.log(cursor1);

	// selects all documents where the field tags value is an array that contains both 'red' and 'blank',
	// without regard to order or other elements in the array.
	const cursor2 = await collection
		.find({ tags: { $all: ['red', 'blank'] } })
		.toArray();
	output(
		'Found the following records that contains the elements of the condition: '
	);
	console.log(cursor2);
};

module.exports = findByCondition;
