---
title: 从工业界的视角看图数据库的现状与发展
pubDate: 2022-12-18 20:14 PST
categories: ["聊聊技术"]
tags: Papers, Graph Database, 图数据库, 大数据
heroImage: /images/blog/graph-visualization-1.png
heroImageDescription: Credit to https://www.b3-ds.com/graph-database-in-healthcare/
---

这篇文章是论文 _[The World of Graph Databases from An Industry Perspective](https://arxiv.org/abs/2211.13170)_ 的阅读笔记。

随着大数据工业的爆炸式发展和越来越多图数据的查询和分析需求，近年来图数据库逐渐在数据库领域占据了一席之地，同时关于图数据库方面的研究也如雨后春笋一般蓬勃发展起来，但提到“研究”二字，就可以看出大部分的文章都是从学术界入手，所以这篇论文的初衷就是成为一扇从工业界的角度看待图数据库的窗口，以此来弥合图数据库在工业界和学术界之间研究差异。

## 用例

目前比较流行的图数据库用法有三类，

- OLTP ：一般是低延迟的图遍历或者模式匹配任务，比如说找出两点之间的最短路径

- OLAP ：通常是针对整张图的复杂分析操作，比如说谷歌的 [PageRank](https://en.wikipedia.org/wiki/PageRank)

- 机器学习：将图的结构转化为向量空间用作机器学习模型训练的特征集，比如说 [Graph neural network (GNN)](https://en.wikipedia.org/wiki/Graph_neural_network)

![](/images/blog/Graph-Use-Cases.drawio.png)

其中 Graph OLTP 和 Graph OLAP 与我们所熟知的 OLTP 和 OLAP 类似，一个是在行的基础上操作，只涉及少量数据，一个是在列的基础上操作，但需要涉及表中所有的记录。

## 图模型

目前业界流行的两种图模型有

- [RDF Model](https://www.w3.org/RDF/)

- Property Graph Model

前者会把每一个属性用一个节点来表示，点和点之间用有向边来连接；而后者允许在一个节点中存储多个属性，更类似于关系型数据库中的一条记录，而边类似于关系型数据库中连接表中的内容。下图更加直观地表示了这两种模型的不同，

![](/images/blog/graph-db-paper-image.png)

可以看到在 Property Graph Model 中 patient 节点可以包含病人的编号和姓名，而这两者在 RDF 模型中表示在不同的节点中，因此使用 Property Graph Model 可以有效节省数据的存储空间，提升查询效率，这也是它在当今业界比 RDF Model 更加流行的原因。

## 查询语言

和关系型数据库统一使用 SQL 不同，查询语言在目前的图数据库领域中暂时没有一个标准，尚处于一个百花齐放的阶段。对于 RDF Model 来说，有 [SPARQL](https://www.w3.org/TR/rdf-sparql-query/) 作为事实上的标准，但由于普适性的原因，它所占的比重并不算大，因此没有什么话语权。在 Property Graph Model 的世界中，几乎每一家公司都发明了一种专属于自家产品的语言，

- [Tinkerpop Gremlin](https://tinkerpop.apache.org/) ，大部分图数据库服务商都支持这种查询语言，但从个人角度来说，这个名字实在太难记了😥

- [Neo4j](https://neo4j.com/) 的 [openCypher](https://opencypher.org/)

- [Oracle](https://www.oracle.com/) 的 [PGQL](https://pgql-lang.org/)

- [TigerGraph](https://tigergraph.com/) 的 [GSQL](https://www.tigergraph.com/gsql/)

- 微软在 [SQL 语言基础上的扩展](https://learn.microsoft.com/en-us/sql/relational-databases/graphs/sql-graph-overview?view=sql-server-ver15)

- [G-core](https://arxiv.org/pdf/1712.01550.pdf)

- ...

这个列表可以很长很长，同时也没有哪一种真的占据了绝对优势，虽然工业界和学术界提出要建立相关的标准—— [GQL](https://www.gqlstandards.org/) ，但目前看来还有较长的路要走。

值得一提的是，其中命令式语言（ imperative ，比如说 C 语言） [Tinkerpop Gremlin](https://tinkerpop.apache.org/) 和声明式语言（ declarative ，比如说 SQL ） [GSQL](https://www.tigergraph.com/gsql/) 是图灵完备的，这也就是说可以用它们实现各种各样的复杂的图算法。

## 业界厂商

在上一部分中，我们看到了很多工业界厂商的名字，图数据库的发展和壮大离不开它们。论文中将厂商分成了三类，

1. 纯粹的图数据库服务商

3. 大数据平台公司，但在它们平台的基础上提供图数据查询分析的能力

5. 云厂商

### 图数据库服务商

这一类的典型代表是 [Neo4j](https://neo4j.com/) 和 [TigerGraph](https://tigergraph.com/) ，这两家公司都提供私有化部署和主流云平台的支持，同时可以支持 OLTP 和 OLAP 的场景，并且作为专门提供图数据库的厂商，它们都针对自己的产品打造了一套完整的生态链，从可视化，常用工具，到内置了大量的图算法，为用户提供极为方便的使用体验。

### 大数据平台公司

这一类型的代表有 [DataStax](https://www.datastax.com/) 和 [Databricks](https://www.databricks.com/) ，它们的特点是支持很多场景下的大数据应用操作，比如说 DataStax 商业化运营 [Cassandra](https://cassandra.apache.org/_/index.html) ， Databricks 靠 [Spark](https://spark.apache.org/) 起家，这决定了它们在大数据领域几乎是个万金油般的存在，从数据管道，到数据湖什么都搞，现在它们在此基础上推出了图形化数据查询的功能，也因此它们提供的“图数据库”无论在功能的数量和性能方面都比不上专门的图数据库公司。

### 云厂商

目前提供图数据库服务的云厂商有亚马逊，微软，甲骨文和 IBM ，得益于平台上其他的服务，它们可以很方便地与图数据库服务集成起来，使得平台上的用户可以快速地把数据导入到图数据库中，无缝衔接自己已有的业务。

论文中总结了一张表格来说明这几种不同的图数据库服务商之间的异同。

![](/images/blog/graph-db-paper-image-1-1024x608.png)

## 图数据库的分类

关于目前的图数据库产品，主要有两种不同的分类方式。

![](/images/blog/Graph-Database-Solution-Space.drawio.png)

### Native vs. Hybrid

Native 指的是产品从最底层的查询和存储引擎开始都是为了图数据库的使用场景服务的，比如说 Neo4j 和 TigerGraph 两家公司都是如此，这带来了超越其他图数据库厂商的性能以及各种原生的工具链支持，但缺点就在于需要自己造的轮子非常多，从事务的支持，访问控制，到高可用，灾难恢复都需要投入大量的人力去实现。而 Hybrid 类型的产品则可以利用现有的各种服务去完成图数据库的非核心功能，只需要少部分人员专注在最关键的问题上即可。

### Graph-Only vs. Converged

顾名思义， Graph-Only 指图数据库产品仅仅提供图数据库应当有的功能，其他的方面一概不关心，当用户使用这种数据库的时候需要把数据从其他存储服务上挪过来，甚至还需要自己进行数据的转换，而 Converged 则集成了多种功能，除了图数据查询分析，还可以跑 SQL 语句，而一家企业进行大数据分析的时候，绝不会仅仅只有分析点和点之间的关系这么简单，而数据也可以放在同一个系统里，省去了在不同平台之间转移的麻烦。因此，虽然很多 Converged 图数据库在性能方面赶不上那些 Graph-Only 的产品，但考虑到其他的操作， Converged 图数据库反而有了时间成本优势。甚至还有些 Converged 的图数据库可以与其他数据库共用一套存储引擎，彻底省去了数据 IO 的开销。

基于此，上述的各家厂商可以按下图分类。

![](/images/blog/graph-db-paper-image-2.png)

## Benchmarks

说到数据库，必然离不开 Benchmarks ，但跟查询语言类似，由于图数据库是一个较新的领域，目前还没有统一的标准，但业界通常使用的是 [LDBC-SNB](https://ldbcouncil.org/benchmarks/snb/) 数据集。

## 一些讨论

有哪些用户会使用图数据库呢？论文中提到主要有三类。

- 社交媒体公司。比如说脸书和领英，它们的业务完全基于图数据，所以它们更倾向于自己实现一套专门为自己的使用场景优化过的图数据库服务而不是直接使用市面上面向大众的产品

- 核心业务强烈依赖于图数据的公司。比如说反欺诈，反洗钱，保险，供应链，商业智能等等，它们的数据往往来自于它们自己的客户，而不是源于自身，所以考虑到数据的复杂度，它们往往会选择使用市面上最符合自己要求的产品

- 老牌数据库用户。现在有了图数据库，他们很可能会利用原来的数据，在新的数据库之上创造新的产品或功能。这类用户更倾向于选择 Converged 图数据库而不是直接尝试新的系统

无论怎样，图数据库作为新兴领域，还需要花大力气去培养用户习惯，让更多的人知道图数据库有什么作用，同时，图数据库与其他服务，尤其是云服务的集成程度还需要继续提升。论文中还为学术界接下来的研究方向提出了建议，

- 算法和性能提升（这方面一直都在搞）

- 事务的支持

- 可视化

- 法律合规（ GDPR 等）

- 多租户和访问控制

- 数据导入导出的优化

## 一点儿感想

这篇论文很好地介绍了图数据库在今天的现状，虽然我自己也是图数据库从业者，但除了自己专注的一亩三分地之外确实鲜有涉及，这篇论文恰好对于我自己的图数据库知识结构作了一个补充。

对于文中提到的目前图数据库面临的问题，我非常同意，尤其是对于用户习惯的培养和数据迁移的麻烦，在近期都将是图数据库发展的制约之一，不过随着互联网的继续发展，更多数据的产生，人们对于数据之间关系的分析需求将会越来越大，无论是从网络安全还是传统制造业的数字化转型角度，图数据库都将发挥更大的作用。

## 参考资料

- _[The World of Graph Databases from An Industry Perspective](https://arxiv.org/abs/2211.13170)_
