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

`find()` 函数用来从数据库中查询符合条件的记录，查询条件作为形参传入函数。

1. 查询所有：给 `find()` 函数传递一个空的 `document` 作为查询条件。 eg:

   ```js
   db.collection('inventory').find({});
   ```

   对应的 SQL:

   ```sql
   SELECT * FROM inventory
   ```

2. 指定等价条件：使用 `{ <field>: <value> }` 表达式作为查询条件。eg:

   ```js
   db.collection('inventory').find({ status: 'D' });
   ```

   对应 SQL:

   ```sql
    SELECT * FROM inventory WHERE status = "D"
   ```

3. 使用*查询操作符*(Query Operators)指定条件：`{ <filed1>: { <operator1>: <value> } }`。 eg:

   ```js
   db.collection('investory').find({ status: { $in: ['A', 'D'] } });
   ```

   对应 SQL:

   ```sql
    SELECT * FROM inventory WHERE status in ("A", "D")
   ```

   [更多 Query Operators](https://docs.mongodb.com/manual/tutorial/query-documents/)

4. `AND`： eg:

   ```js
   db.collection('inventory').find({ status: 'A', qty: { $lt: 30 } });
   ```

   对应 SQL:

   ```sql
   SELECT * FROM inventory WHERE status = "A" AND qty < 30
   ```

5. `OR`: eg

   ```js
   db.collection('inventory').find({
   	$or: [{ status: 'A' }, { qty: { $lt: 30 } }]
   });
   ```

   对应 SQL:

   ```SQL
   SELECT * FROM inventory WHERE status = "A" OR qty < 30
   ```

6. `AND` 和 `OR` 一起：eg:

   ```js
   db.collection('inventory').find({
   	status: 'A',
   	$or: [{ qty: { $lt: 30 } }, { item: { $regex: '^p' } }]
   });
   ```

   对应 SQL:

   ```sql
   SELECT * FROM inventory WHERE status = "A" AND (qty < 30 OR item LIKE "p%")
   ```
