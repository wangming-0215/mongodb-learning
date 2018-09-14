const output = require('../../utils/output');

/**
 * Query an array for an element
 *
 * To query if the array field contains at least one element with the specify value,
 * use the filter `{ <field>: <value> }`  where the <value> is the element value.
 * @param {*} db
 */
const findByCondition = async db => {
	const collection = db.collection('inventory');

	// selects all doucments where tags is an array that contains the string 'red' as one of its elements
	const cursor1 = await collection.find({ tags: 'red' }).toArray();
	output('Found the following records: ');
	console.log(cursor1);

	// to specify conditions on the elements in the array field, use query operators in the query filter doucment
	// { <array field>: { <operator>: <value> } }
	const cursor2 = await collection.find({ dim_cm: { $gt: 25 } }).toArray();
	output('Found the following records: ');
	console.log(cursor2);
};

module.exports = findByCondition;
