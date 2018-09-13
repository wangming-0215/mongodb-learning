const output = require('../../utils/output');

/**
 * specify `AND` condition
 *
 * @param {*} db
 */
const findByCondition = async db => {
	const collection = db.collection('inventory');

	// selects all document where the nested field h is less than 15, the nested field uom equals 'in', and the status field equals 'D'
	const cursor = await collection
		.find({
			'size.h': { $lt: 15 },
			'size.uom': 'in',
			status: 'D'
		})
		.toArray();

	output('Found the following records: ');
	console.log(cursor);
};

module.exports = findByCondition;
