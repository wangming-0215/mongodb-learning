const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://localhost:27017/';
const DB_NAME = 'tutorial';

/**
 * insert documents
 *
 * The `insert` command returns an object with the following fields:
 * 1. `result`: contains the result document from mongodb;
 * 2. `ops`: contains the documents inserted with added `_id` fields;
 * 3. `connection`: contains the connection used to perform a insert.
 *
 * @param {*} db 要插入 document 的数据库
 * @param {function} callback 插入操作完成后的回调
 */
const insertDocuments = (db, callback) => {
	// get the documents collection
	const collection = db.collection('documents');
	// insert some documents
	collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], (err, result) => {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log('Inserted 3 documents into the collection');
		callback(result);
	});
};

/**
 * find all documents
 *
 * @param {*} db
 * @param {function} callback
 */
const findAllDocuments = (db, callback) => {
	// get the documents collection
	const collection = db.collection('documents');
	// find all documents
	collection.find({}).toArray((err, docs) => {
		assert.equal(err, null);
		console.log('Found the following records');
		console.log(docs);
		callback(docs);
	});
};

/**
 * find documents with a query filter
 * @param {*} db
 * @param {*} callback
 */
const findDocuments = (db, callback) => {
	// get the documents collection
	const collection = db.collection('documents');
	// find the documents with a query filter
	// only the document which match `a: 3` should be returned
	collection.find({ a: 3 }).toArray((err, docs) => {
		assert.equal(err, null);
		console.log('Found the following records');
		console.log(docs);
		callback(docs);
	});
};

/**
 * update a document
 *
 * @param {*} db
 * @param {*} callback
 */
const updateDocument = (db, callback) => {
	// get the documents collection
	const collection = db.collection('documents');
	// update a document
	// update the first document where the field `a` is equal to `3`
	// by adding a new field `b` to the document set to `1`
	collection.updateOne({ a: 3 }, { $set: { b: 1 } }, (err, result) => {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log('Updated the document with field a equal to 3');
		callback(result);
	});
};

/**
 * remove a document
 *
 * remove the document where the field `a` is equal to 3
 * @param {*} db
 * @param {*} callback
 */
const removeDocument = (db, callback) => {
	// get the documents collection
	const collection = db.collection('documents');

	// remove the document where the field `a` is equal to 3
	collection.deleteOne({ a: 3 }, (err, result) => {
		assert.equal(err, null);
		assert.equal(result.result.n, 1);
		console.log('Removed the document with the field a equal to 3');
		callback(result);
	});
};

/**
 * index a collection
 *
 * Indexes can improve your application's performance
 * @param {*} db
 * @param {*} callback
 */
const indexCollection = (db, callback) => {
	// get the documents collection
	const collection = db.collection('documents');

	// create index on the field a in the documents collection
	collection.createIndex({ a: 1 }, null, (err, result) => {
		assert.equal(err, null);
		console.log(result);
		callback();
	});
};

MongoClient.connect(
	MONGO_URL,
	(err, client) => {
		assert.equal(null, err);
		console.log('connected successfully to server');
		const db = client.db(DB_NAME);

		// insert documents
		// insertDocuments(db, () => client.close());

		// find all documents
		// findAllDocuments(db, () => client.close());

		// find the documents with a query filter
		// findDocuments(db, () => client.close());

		// update the first document where the filed a is equal to 3
		// updateDocument(db, () => client.close());

		// remove the document whih the field a equal to 3
		// removeDocument(db, () => client.close());
		indexCollection(db, () => {});
		findAllDocuments(db, () => client.close());
	}
);
