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

## Query on Embedded/Nested Document

1. 匹配嵌入/嵌套文档：`{ <field>: <value> }`:

   ```js
   const cursor = db.collection('inventory').find({
   	size: { h: 14, w: 21, uom: 'cm' }
   });
   ```

   指定的 `<value>` 要与文档完全匹配，才能查询要符合条件的结果，包括文档域的顺序。

2. 查询嵌套字段：使用“点符号”（`.`）， `field.nestedField`:

   ```js
   const cursor = db.collection('inventory').find({ 'size.uom': 'in' });
   ```

3. 使用 `query operator` 指定查询条件：`{ <field1>: { <operator1>: <value1> }, ... }`

   ```js
   const cursor = db.collection('inventory').find({ 'size.h': { $lt: 15 } });
   ```

4. 指定 `AND` 条件：

   ```js
   const corsor = db.collection('inventory').find({
   	'size.h': { $lt: 15 },
   	'size.uom': 'in',
   	status: 'D'
   });
   ```

## Query an Array

1. 匹配数组： 使用 `{ <field>: <value>}` 来指定查询条件，其中 `<value>` 是个精确匹配数组的值，包括数据中元素的顺序都要保持一致。

   ```js
   const cursor = db.collection('inventory').find({ tags: ['red', 'black'] });
   ```

   如果想要查询包含某些元素的数组，而不考虑元素的顺序或者其他元素，可以使用 `$all` 操作符：

   ```js
   const cursor = db
   	.collection('inventory')
   	.find({ tags: { $all: ['red', 'black'] } });
   ```

2. 查询包含某个元素的数组：如果想要查询至少包含一个指定元素的数组，可以使用 `{ <field>: <value>}`，其中 `<value>` 就是指定的元素：

   ```js
   // 数组中至少包含一个 'red' 字符串
   const cursor = db.collection('inventory').find({ tags: 'red' });
   ```

   使用 `query operator` 指定查询数组中元素的条件：`{ <array field>: { <operator1>: <value1> }, ... }`

   ```js
   // 'dim_cm' 中至少包含一个大于 25 的元素
   const cursor = db.collection('inventory').find({ dim_cm: { $gt: 25 } });
   ```

3. 在数组元素上使用复合过滤条件查询数组：(这个真没看懂)

   ```js
   const cursor = db
   	.collection('inventory')
   	.find({ dim_cm: { $gt: 15, $lt: 20 } });
   ```

4. 查询符合多个条件的数组元素：使用 `$elemMatch` 指定查询数组元素的多个条件，以便至少有一个数组元素满足指定的条件

   ```js
   // 查询大于22且小于30的元素
   const cursor = db
   	.collection('inventory')
   	.find({ dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } });
   ```

5. 通过索引位置查询数组元素：通过 _点表示法_ 可以查询特定索引的数组元素

   ```js
   const cursor = db.collection('inventory').find({ 'dim_cm.1': { $gt: 25 } });
   ```

6. 通过数组长度查询数组：使用 `$size` 操作符按元素数量查询数组
   ```js
   const cursor = db.collection('inventory').find({ tags: { $size: 3 } });
   ```
