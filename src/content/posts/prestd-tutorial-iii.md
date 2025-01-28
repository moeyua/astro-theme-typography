---
title: pRESTd 试用笔记（三）——查询篇
pubDate: 2022-03-27 23:25 PST
categories: ["聊聊技术"]
tags: Go, PostgreSQL, pRESTd, RESTful API, 运维
heroImage: /images/blog/magnifier-scaled.jpeg
heroImageDescription: Photo by Ali Bakhtiari on Unsplash
---

为了在体验上连贯有序，在阅读本篇之前，建议先阅读下列两篇笔记，

- [pRESTd 试用笔记（一）——安装篇](https://old-panda.com/posts/prestd-tutorial-i)
- [pRESTd 试用笔记（二）——配置篇](https://old-panda.com/posts/prestd-tutorial-ii)

在前面的文章中我们已经成功安装了 pRESTd 并根据具体使用需求调整了配置，是时候来探索一下 pRESTd 的数据查询功能了，简单起见，我在配置文件中关掉了 auth 功能（将 `jwt.default` 和 `auth.enabled` 置为 `false` ）和缓存功能（将 `cache.enabled` 置为 `false` ）。

# 简单查询

在这一部分中将说明如何通过 pRESTd 进行简单的增删查改功能。由于是通过 http 请求进行操作，所以数据库的增删查改也恰好分别对应了 [http 请求的动作语义](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)（ `POST` ， `DELETE` ， `GET` ， `PUT` ）。

## 增

文档链接： [https://docs.prestd.com/prestd/docs/api-reference/endpoints/#post](https://docs.prestd.com/prestd/docs/api-reference/endpoints/#post)

查询之前，我们需要插入一些数据，现在数据库中已经有了数据表 `prestd.prest.persons` ，并且有了一条名为 Bob 的记录，接下来增加新的几条记录，

```shell
~ » curl -X POST http://localhost:3000/prestd/prest/persons -d '
{
    "id":2,
    "name":"Carol",
    "age":21,
    "gender":"female"
}'
```

pRESTd 也支持批量插入，按照[文档](https://docs.prestd.com/prestd/docs/api-reference/advanced-queries/#batch-insert)中所说，发送如下请求可以一次性插入多条数据，注意路径中多了一个 `batch` ，

```shell
~ » curl -X POST http://localhost:3000/batch/prestd/prest/persons -d '
[
    {"id":3,"name":"Charlie","age":22,"gender":"male"},
    {"id":4,"name":"Chuck","age":23,"gender":"male"},
    {"id":5,"name":"Eve","age":24,"gender":"female"}
]'
```

## 查

文档链接： [https://docs.prestd.com/prestd/docs/api-reference/endpoints/#get](https://docs.prestd.com/prestd/docs/api-reference/endpoints/#get)

此时如果进行整表查询的话，可以看到表中有如下五条记录，

```shell
~ » curl http://localhost:3000/prestd/prest/persons
```

```
[{"id":1,"name":"Bob","age":20,"gender":"male"},
 {"id":2,"name":"Carol","age":21,"gender":"female"},
 {"id":3,"name":"Charlie","age":22,"gender":"male"},
 {"id":4,"name":"Chuck","age":23,"gender":"male"},
 {"id":5,"name":"Eve","age":24,"gender":"female"}]
```

不同类型的查询通过提供 URL 中的[查询参数](https://en.wikipedia.org/wiki/Query_string)来完成，完整的参数可以参考[官方文档](https://docs.prestd.com/prestd/api-reference/parameters)，下面将简单介绍几种比较常用的查询操作。

### 指定列查询

pRESTd 还支持仅仅返回其中的几列数据而不是整个记录，例如我们只想知道**名字**和**年龄**，其他的一概不关心， SQL 的写法为

```sql
SELECT name, age
FROM prestd.prest.persons
```

对应的 pRESTd 请求则为

```shell
~ » curl http://localhost:3000/prestd/prest/persons\?_select\=name,age
```

```json
[{"name":"Bob","age":20},
 {"name":"Carol","age":21},
 {"name":"Charlie","age":22},
 {"name":"Chuck","age":23},
 {"name":"Eve","age":24}]
```

### 条件查询

很多时候用不到这么多数据，这时往往更希望得到符合某个条件的结果，pRESTd 也提供了条件查询功能，将条件通过 URL 的[查询参数](https://en.wikipedia.org/wiki/Query_string)发过去即可。比如说我们只想知道**性别为男**的有哪些记录，

用 SQL 查询很容易，

```sql
SELECT *
FROM prestd.prest.persons
WHERE gender='male'
```

对应的 pRESTd 请求为

```shell
~ » curl http://localhost:3000/prestd/prest/persons\?gender\=male
```

```json
[{"id":1,"name":"Bob","age":20,"gender":"male"},
 {"id":3,"name":"Charlie","age":22,"gender":"male"},
 {"id":4,"name":"Chuck","age":23,"gender":"male"}]
```

或者只需要**年龄范围在 23 岁（包含）到 25 岁（包含）**之间的结果，

如下的 SQL

```sql
SELECT *
FROM prestd.prest.persons
WHERE age>=23 AND age<=25
```

可以转换为

```shell
~ » curl http://localhost:3000/prestd/prest/persons\?age\='$gte.23'\&age\='$lte.25'
```

```json
[{"id":4,"name":"Chuck","age":23,"gender":"male"},
 {"id":5,"name":"Eve","age":24,"gender":"female"}]
```

👉 _关于 pRESTd 范围查询说明，可以参考[这篇文档](https://docs.prestd.com/prestd/docs/api-reference/advanced-queries/#filter-range)。pRESTd 还支持其他比较操作符，可以参考操作符[列表](https://docs.prestd.com/prestd/api-reference/parameters/#operators)。_

## 改

文档链接： [https://docs.prestd.com/prestd/docs/api-reference/endpoints/#patch-and-put](https://docs.prestd.com/prestd/docs/api-reference/endpoints/#patch-and-put)

修改数据的操作比较简单，通常是向 pRESTd 发送一个 `PUT` 请求，在 URL 的路径中指定数据表，用查询参数过滤出想要操作的数据，请求载荷即为想要修改的数据。

比如说，我们发现之前的数据有错，希望**把 id 为 1 的数据记录中的 age 改为 23** ，不难写出如下 SQL

```sql
UPDATE prestd.prest.persons
SET age=23
WHERE id=1
```

那么对应的 pRESTd 请求为

```shell
~ » curl -X PUT http://localhost:3000/prestd/prest/persons\?id\=1 -d '
{
    "age": 23
}'
```

此时查看该条数据，可以看到 age 的值已经变为 23 了

```shell
~ » curl http://localhost:3000/prestd/prest/persons\?id\=1
```

```json
[{"id":1,"name":"Bob","age":23,"gender":"male"}]
```

**注意**：如果在修改数据时不加条件，该请求会修改表中**所有**的数据！

## 删

文档链接： [https://docs.prestd.com/prestd/docs/api-reference/endpoints/#delete](https://docs.prestd.com/prestd/docs/api-reference/endpoints/#delete)

删数据的请求格式类似于上面的改数据，只不过将 `PUT` 请求换成了 `DELETE` 请求。

比如说现在有个需求，要**删掉 id 为 5 的数据**， SQL 为

```sql
DELETE FROM prestd.prest.persons
WHERE id=5
```

对应的 pRESTd 请求为

```shell
~ » curl -X DELETE http://localhost:3000/prestd/prest/persons\?id\=5
```

**注意**：如果在删除数据时不加条件，该请求会删掉表中**所有**的数据！

# 复杂查询

除了上述的简单操作， pRESTd 也支持[更加复杂的查询](https://docs.prestd.com/prestd/docs/api-reference/advanced-queries/)，同样地，在此只介绍平时用的比较多的几种。

在深入之前，我们先把上面删掉的 id 为 5 的记录添加回来，

```shell
curl -X POST http://localhost:3000/prestd/prest/persons -d '
{
    "id":5,
    "name":"Eve",
    "age":24,
    "gender":"female"
}'
```

## 聚合查询

文档链接： [https://docs.prestd.com/prestd/api-reference/parameters/#functions-support](https://docs.prestd.com/prestd/api-reference/parameters/#functions-support)

SQL 中允许用户从一组数据记录中得出一条单独的结论，比如说求平均值、最大值等，我们也可以用 prestd 得到想要的结果。

比如说我们想知道在表中**男女分组中最大年龄分别是多少**，用 SQL 的话很容易，

```sql
SELECT gender, MAX(age)
FROM prestd.prest.persons
GROUP BY gender
```

用 pRESTd 也不难，

```
~ » curl http://localhost:3000/prestd/prest/persons\?_select\=gender,max:age\&_groupby\=gender
```

```json
[{"gender":"female","max":24},
 {"gender":"male","max":23}]
```

但是通过 pRESTd 进行聚合查询有一个限制，就是必须要在查询参数里面带上 `_groupby` ，否则会报错说找不到该列，比如说想要查询五个人中最大的年龄是多少，就会得到如下的错误，

```shell
~ » curl http://localhost:3000/prestd/prest/persons\?_select\=max:age
{
	"error": "invalid identifier max:age"
}
```

希望 pRESTd 不久之后可以添加对这种查询语句的支持。

## JOIN

文档链接： [https://docs.prestd.com/prestd/docs/api-reference/advanced-queries/#join](https://docs.prestd.com/prestd/docs/api-reference/advanced-queries/#join)

`JOIN` 操作可以说是 SQL 中多表查询的常客，因为在生产环境中往往有不同的数据模型分别存在不同的表中，在查询数据时如果涉及到多个表的内容，就需要通过 `JOIN` 将两个表中有联系的数据放在一起才能得到结果。

为了演示，首先要创建第二张数据表 `schools` ，

```sql
CREATE TABLE prest.schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);
```

因为一所学校中可以有多个学生，学校和学生为一对多的关系，所以为已有的 persons 表添加指向学校的外键，

```sql
ALTER TABLE prest.persons ADD COLUMN school_id int;
ALTER TABLE prest.persons ADD CONSTRAINT fk_persons_schools FOREIGN KEY (school_id) REFERENCES schools(id);
```

向表中填入数据，

```shell
~ » curl -X POST http://localhost:3000/batch/prestd/prest/schools -d '
[
    {"id": 1, "name": "Foo"},
    {"id": 2, "name": "Bar"}
]'
```

随便给学生们分配一下学校， `id` 小于等于 3 的到学校 1 号，大于 3 的到学校 2 号，

```shell
curl -X PUT http://localhost:3000/prestd/prest/persons\?id\='$lte.3' -d '{"school_id":1}'
curl -X PUT http://localhost:3000/prestd/prest/persons\?id\='$gt.3' -d '{"school_id":2}'
```

那么现在问题来了，**在学校 "Foo" 就读的学生中年龄大于等于 22 岁的学生都有谁？**

SQL 的语法依然很简单，

```sql
SELECT persons.name
FROM prestd.prest.persons
JOIN prestd.prest.schools
ON (persons.school_id=schools.id)
WHERE schools.name='Foo'
  AND persons.age>=22;
```

照着官方文档翻译成 prestd 请求则为

```shell
curl http://localhost:3000/prestd/prest/persons\?_select\=persons.name\&_join\=inner:schools:persons.school_id:\$eq:schools.id\&schools.name\='Foo'\&persons.age\='$gte.22'
```

```json
[{"name":"Bob"},
 {"name":"Charlie"}]
```

可以看出，用 pRESTd 进行 `JOIN` 查询是非常麻烦的一件事， URL 中的参数很多，一不小心就容易写错，为了方便用户， pRESTd 还支持通过 SQL 模板进行自定义查询。

## 自定义查询

文档链接： [https://docs.prestd.com/prestd/docs/api-reference/queries/](https://docs.prestd.com/prestd/docs/api-reference/queries/)

pRESTd 允许用户自定义 SQL 查询模板，在发送 http 请求的时候填入参数即可使用。回到上面 `JOIN` 查询的问题，如果将其改造成查询模板，即给定学校名称和年龄限制，要求得到学生的名单，那么如何创建这样的自定义查询呢？

首先在 `~/prestd` 下创建文件夹 `queries/my_queries` ，

```shell
~/prestd » mkdir -p queries/my_queries
```

然后在 `my_queries` 文件夹里创建文件 `student_names.read.sql` ，并填入如下查询语句，

```sql
SELECT persons.name
FROM prestd.prest.persons
JOIN prestd.prest.schools
ON (persons.school_id=schools.id)
WHERE schools.name='{{.school_name}}'
  AND persons.age>={{.person_age}}
```

此时 `~/prestd` 文件夹的内容应如下所示，

```shell
~/prestd » tree .
.
├── prest.toml
└── queries
    └── my_queries
        └── student_names.read.sql
```

在 prestd 配置文件中添加自定义查询文件的路径并重启，

```
[queries]
location = /path/to/prestd/queries/
```

这里的路径需要 `queries` 文件夹的绝对路径。

发送一条请求试试看，

```shell
~ » curl http://localhost:3000/_QUERIES/my_queries/student_names\?school_name\='Foo'\&person_age\='22'
```

```json
[{"name":"Bob"},
 {"name":"Charlie"}]
```

正是我们想要的结果！

值得一提的是 pRESTd 对 sql 模板文件的后缀有要求，创建文件之前需要想好该查询的目的， http 请求的动作必须与后缀相匹配，要不然就会翻车了。详情可以查看[文档](https://docs.prestd.com/prestd/docs/api-reference/queries/#scripts-templates-rules)中对文件后缀的说明。

👉 _在官方文档中有对模板语法的详细介绍，由于不是本文的重点，在此不再赘述，有兴趣的读者可以去 pRESTd 的[官网](https://docs.prestd.com/prestd/docs/api-reference/queries/#template-data)查询参考。_

# 参考资料

- [https://docs.prestd.com/](https://docs.prestd.com/)
