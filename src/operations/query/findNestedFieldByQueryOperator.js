const output = require('../../utils/output');

/**
 * specify match using query operator
 *
 * @param {*} db
 */
const findByCondition = async db => {
	const collection = db.collection('inventory');

	// selects all documents where the field `h` nested in the field `size` is less than 15
	const cursor = await collection.find({ 'size.h': { $lt: 15 } }).toArray();
	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findByCondition;
