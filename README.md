# Mongodb & Mongod

## 连接数据库

```js
const MongoClient = require('mongod');

// connection url
const url = 'mongodb://localhost:27017';

// database name
const dbName = 'tutorial';

// use connect method to connect to the server
MongoClient.connect(
	url,
	(err, client) => {
		console.log('connected successfully to server');
		const db = client.db(dbName);

		// close db
		db.close();
	}
);
```

## Insert Documents

`insert` 指令：插入 `document` 到 `collection`中，如果 `collection` 不存在，会自动创建。

1. `insertOne()`: 插入单个 `document` 到 `collection` 中;

   - 返回包含 `result` 的 `promise`,
   - `result.insertedId` 就是文档的 `_id`。

2. `insertMany()`： 插入多个 `document` 到 `collection` 中。

   - Pass an array of documents to the method.
   - `insertMany([])`

3. `insert` 指令返回一个对象，包含以下三个字段：

   - `result`: 包含来自 `Mongodb` 的结果文档 `{ n: 1, ok: 1}`, 插入的文档个数 `n` 和插入的状态 `ok`；
   - `ops`: 包含带有 `_id` 字段的插入的文档；
   - `connection`： 包含用于执行“插入”操作的连接。

## Query Documents
