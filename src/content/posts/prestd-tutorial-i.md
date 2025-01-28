---
title: pRESTd 试用笔记（一）——安装篇
pubDate: 2022-03-12 15:00 PST
categories: ["聊聊技术"]
tags: Go, PostgreSQL, pRESTd, RESTful API, 运维
heroImage: /images/blog/girl-and-computer-scaled.jpeg
heroImageDescription: Photo by Maxim Ilyahov on Unsplash
---

最近发现了一个有意思的项目 [pRESTd](https://docs.prestd.com/) ，可以将 PostgreSQL 数据库的操作转换为 RESTful API 请求，虽然暂时没有 100% 做到对 SQL 语句的支持，但通过 http 请求的方式提供了比 psql 控制台和代码更为轻量更为灵活的方式，根据他们官方文档的介绍， prestd 也支持类 PostgreSQL 的其他数据库，诸如 [TimescaleDB](https://docs.prestd.com/prestd/integrations/timescaledb/) 和 [Redshift](https://docs.prestd.com/prestd/integrations/redshift/) 。

其实，市面上很多数据库都原生支持 RESTful API ，允许用户以这种简单的方式进行有限的数据库访问及操作，比如说 [Snowflake](https://docs.snowflake.com/en/developer-guide/sql-api/index.html) ， [CockroachDB](https://www.cockroachlabs.com/docs/api/cluster/v2.html) 和 [TigerGraph](https://docs.tigergraph.com/tigergraph-server/current/api/) ， pRESTd 的出现恰好为 PostgreSQL 这种更为流行的数据库补齐了这块短板。

限于篇幅，本文仅涉及 pRESTd 的环境准备和安装过程。

# 环境需求

- PostgreSQL 数据库，我本地的版本为 13.4 。如果需要在云端安装 PostgreSQL ，可以参考[这篇文章](https://old-panda.com/posts/amazon-linux-2-postgresql)及其他相关文档

- Go 版本 1.7+ ，我这里的版本为 `go version go1.17.7 darwin/amd64`

pRESTd 也提供其他的[安装方式](https://docs.prestd.com/prestd/setup/)，但 Homebrew 的方式仅仅限于 MacOS ， Docker 虽然被官网推荐，但实际操作起来稍（吃）麻（内）烦（存），所以这里选择用 Go 语言自带的 install 命令直接安装，使用效果都是一样的，哪种安装方式的选择可以根据自己的具体情况而定。

为了使本地环境保持整洁，我在个人目录下准备了一个文件夹专门用来存放 prestd 相关的所有文件，

```shell
mkdir ~/prestd && cd ~/prestd
```

# 安装 pRESTd

在写作本文之时，官方提供的 [Go 安装方式](https://docs.prestd.com/prestd/setup/golang/)有些问题，在本地上会出现下列错误，

```shell
~/prestd » go install github.com/prest/prest/cmd/prestd@latest
# github.com/prest/prest/cmd
../go/pkg/mod/github.com/prest/prest/cmd@v0.0.0-20201101142512-f646e763875a/migrate.go:31:32: config.PrestConf.Adapter.ShowTable undefined (type adapters.Adapter has no field or method ShowTable)
../go/pkg/mod/github.com/prest/prest/cmd@v0.0.0-20201101142512-f646e763875a/root.go:62:25: undefined: controllers.Auth
../go/pkg/mod/github.com/prest/prest/cmd@v0.0.0-20201101142512-f646e763875a/root.go:69:52: undefined: controllers.ShowTable
../go/pkg/mod/github.com/prest/prest/cmd@v0.0.0-20201101142512-f646e763875a/root.go:78:3: undefined: middlewares.AuthMiddleware
```

我没有深究原因，而是按照以往安装 Go 可执行文件的方式，直接去他们的 [GitHub 仓库](https://github.com/prest/prest)上找到了当前最新发布的版本 `v1.0.14` ，然后执行

```shell
go install github.com/prest/prest/cmd/prestd@v1.0.14
```

这样 pRESTd 就成功安装到了 `$GOPATH/bin` 下，为了方便使用，可以将 `$GOPATH/bin` 添加到 `$PATH` 中。

# 准备 PostgreSQL 环境

因为 pRESTd 本身并不提供创建数据库表的权限，并且最好创建一个专门的用户用于 pRESTd 连接数据库，以保证 pRESTd 和数据库其他部分的互相独立，所以需要事先在 PostgreSQL 上准备好这些。

```shell
psql -U postgres
```

以下的步骤仅仅为了演示的目的，在实际使用中可以按需更改。

首先创建一个专门的数据库供 pRESTd 访问，

```sql
CREATE DATABASE prestd;
```

继续创建用户，

```sql
CREATE USER prest WITH PASSWORD 'prest_pw';
```

为该用户创建一个专门的 schema ，演示所用的数据表将会建在这个 schema 下，

```sql
CREATE SCHEMA AUTHORIZATION prest;
```

现在使用用户 `prest` 连接刚刚创建的数据库 `prestd` ，这样创建的表都会在该用户的名下，

```
postgres=# \c prestd prest
You are now connected to database "prestd" as user "prest".
```

然后创建一张简单的数据表，

```sql
CREATE TABLE prest.persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    age INT,
    gender VARCHAR(16)
);
```

至此， PostgreSQL 端的准备工作全部完成。

# 准备 pRESTd 配置文件

根据[官网](https://docs.prestd.com/prestd/deployment/server-configuration/)描述， pRESTd 可以通过环境变量和 [toml 文件](https://toml.io/en/)进行配置，为了简单起见，在这里我们使用 toml 文件。

因为本篇不涉及过多的配置细节，所以尽量用最少的配置把 pRESTd 跑起来，在 `~/prestd` 下创建文件，

```shell
vim prest.toml
```

然后填入下述内容，其中的 `[pg]` 部分为本地 PostgreSQL 的配置，需要根据具体的情况来调整配置值。

```
migrations = "./migrations"

# debug = true
# enabling debug mode will disable JWT authorization

[http]
port = 3000

[jwt]
default = false

[pg]
host = "127.0.0.1"
user = "prest"
pass = "prest_pw"
port = 5432
database = "prestd"
single = true
## or used cloud factor
# URL = "postgresql://user:pass@localhost/mydatabase/?sslmode=disable"

[ssl]
mode = "disable"
```

# 运行 pRESTd

在 `~/prestd` 文件夹下执行 `prestd` ，终端会输出如下内容，显示监听 3000 端口，说明 `prestd` 成功启动了。

```
~/prestd » prestd
2022/03/12 14:39:58 [warning] adapter is not set. Using the default (postgres)
2022/03/12 14:39:58 [warning] You are running prestd in public mode.
[prestd] listening on 0.0.0.0:3000 and serving on /
```

发送一条 http 请求试试看，

```
~ » curl http://localhost:3000/tables
[{"schema":"prest","name":"persons","type":"table","owner":"prest"},
 {"schema":"prest","name":"persons_id_seq","type":"sequence","owner":"prest"}]
```

pRESTd 返回了刚刚创建的表，同时，在运行 `prestd` 的窗口中显示了这样一条 log

```
...
[negroni] 2022-03-12T14:41:30-08:00 | 200 | 	 10.063848ms | localhost:3000 | GET /tables
...
```

大功告成！

# 参考资料

- [https://docs.prestd.com/](https://docs.prestd.com/)
