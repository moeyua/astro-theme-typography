---
title: DynamoDB 中遇到的“坑”
pubDate: 2017-10-29 14:39:00 PST
categories: ["聊聊技术"]
tags: boto3, DynamoDB, database, AWS, Python
heroImage: /images/blog/care-pitfalls.jpg
heroImageDescription: Photo by Kevin Ku on Unsplash
---

DynamoDB 的优势无需赘言，在[亚麻的 paper](http://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) 和 [AWS 的技术文档](https://aws.amazon.com/documentation/dynamodb/)中已经讲了无数遍，大量的工业实践经验也证明了 DynamoDB 确实是一款非常优秀的数据库。所以这篇文章的重点放在了个人使用 DynamoDB 的过程中遇到的坑。其实严格来讲很多不应该算“坑”，只是因为之前没有接触过，所以用起来多少感到些许不适应，简单起见，也归为了“坑”的一类。在使用中，我的环境是 Python 2.7.14 ，连接数据库的 driver 使用的是 [boto3](http://boto3.readthedocs.io/en/latest/reference/services/dynamodb.html) 。

1. DynamoDB 不支持 Python 中的 `tuple` 类型，需要将其转换为 `list` 再进行写入。这样做可以理解，虽然在 Python 中两种数据结构不同，但在存储的角度来看并无区别，的确没有必要实现两种同样的数据类型。

3. DynamoDB 不支持空字符串，但是支持 `None` ，因此实际生产中要么把空字符串的域（列）删掉，要么用 `None` 来代替空字符串，要么用某个特殊字符来代替空字符串。推荐第一种方式。DynamoDB 作为一种 NoSQL 数据库，本身对每条数据的格式不作要求，所以如果某个域（列）为空的话，简单舍弃即可，若采用替换的方式，可能会出现意想不到的问题，比如说可能混淆的替换的 `None` 和原本值为 `None` 的域。

5. 很难对 DynamoDB 中的查询进行计数。DynamoDB 没有提供现成的计数操作，所以统计符合某个查询的结果数无异于全表扫描，这在时间上是无法忍受的（数据量很小的情况除外）。

7. 批量读写受限。[文档](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html#WorkingWithItems.BatchOperations)中写道，读操作一次可以处理最多100条请求，返回最多 16 MB 的数据；写操作一次可以处理最多25条请求，写入最多 16 MB 的数据，同时每条数据的大小不得超过 400 KB。不过也不好说这就是个坑，因为目前已知的只有 DynamoDB 的文档把这个限制明确告诉我们了，之前看其他数据库的文档并没有发现类似的说明，也有可能是我看的不仔细吧。

9. 奇怪的 json 格式。DynamoDB 的数据结构采用的他们独家定义的一种 json 结构，具体。。不太好说明，总之和 Python 由 json.dumps 一个字典生成的不一样，还是直接查看[文档](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors)好了。这种 json 格式导致其难以与整个系统中其他部分兼容，好在发现了一个叫做 [dynamodb-json](https://pypi.python.org/pypi/dynamodb-json/1.2) 的库，可以将 dynamodb json 转换为平时常见的 json。不过这个库本身也有问题，它无法正确的转换负浮点数，我已经帮它打了[补丁](https://github.com/Alonreznik/dynamodb-json/pull/5)，希望能包含在下一次版本发布中。

11. 将 Python 浮点数写入 DynamoDB 前需要转换为 `decimal.Decimal` 类型，如

```
>>> import decimal
>>> decimal.Decimal('123.123') Decimal('123.123')
```

这主要是因为浮点数无法精确地用二进制表示，而 DynamoDB 要求浮点数精确表示。

以上是目前我的一些使用经验，可能还有其他各种不适应的地方有待去发现。虽然 DynamoDB 对初次接触它的人来说有很多看起来“奇怪”的地方，但用习惯了并没有太多的槽点，并且对我而言，还有它最大的优势——运维方便，不需要人工去维护一个数据库集群包含多少机器，它会自动的根据数据量扩展；也不需要我们自己去写一个复杂的配置文件及一个日志系统去监控它的运行，一切都可以通过 AWS 控制台中点鼠标实现，在生产环境中，可以称为理想。
