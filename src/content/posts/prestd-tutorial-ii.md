---
title: pRESTd 试用笔记（二）——配置篇
pubDate: 2022-03-19 16:28 PST
categories: ["聊聊技术"]
tags: Go, PostgreSQL, pRESTd, RESTful API, 运维
heroImage: /images/blog/config-scaled.jpeg
heroImageDescription: Photo by Paul Hanaoka on Unsplash
---

在[上一篇笔记](https://old-panda.com/posts/prestd-tutorial-i)中我们用最基本的配置在本地运行了 pRESTd ，然而[官方文档](https://docs.prestd.com/prestd/deployment/server-configuration/)提供了非常丰富的配置参数来满足不同用户的需求，在做部署的时候，按需调参是必不可少的步骤。虽然官方文档已经非常清晰明了，但我觉得有些常用配置还是值得单独拿出来提一句。

注：下文中每次配置文件的修改都需要重启 pRESTd 才能生效。

# 用户授权配置

用户授权访问的启用需要同时配置 [JWT](https://docs.prestd.com/prestd/deployment/server-configuration/#jwt) 和 [AUTH](https://docs.prestd.com/prestd/deployment/server-configuration/#auth) 。

## JWT

部署了 pRESTd 之后，在生产环境中，从安全的角度考虑，我们通常希望只允许有权限的人才能访问这些接口。我们可以在 pRESTd 的配置中启用 jwt ，要求所有的 http 请求都需要把授权令牌放在请求头中才可以访问，此时配置文件如下所示（本文所有配置文件的修改都基于[这里](https://old-panda.com/posts/prestd-tutorial-i/#3-%E5%87%86%E5%A4%87-prestd-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)的内容），将 jwt 部分的 `default` 改为了 `true`

```
migrations = "./migrations"

# debug = true
# enabling debug mode will disable JWT authorization

[http]
port = 3000

[jwt]
default = true

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

此时再去尝试访问 `/tables` 就会出现未授权的错误，符合预期。

```
~ » curl http://localhost:3000/tables
{
	"error": "authorization token is empty"
}
```

## AUTH

为了获得授权令牌，我们需要让 pRESTd 知道我们是哪个用户，说白了就是证明“我是我”的过程，而这个过程需要 [auth 部分](https://docs.prestd.com/prestd/deployment/server-configuration/#auth)的配合，在上述配置文件中填入相关内容，

```
...
[auth]
enabled = true
type = "basic"
encrypt = "MD5"
table = "prestd_users"
username = "username"
password = "password"
...
```

`enabled` 参数顾名思义，用来控制是否启用该 auth 配置，其他参数的说明可以参见下表，

<table><tbody><tr><td>参数</td><td>描述</td></tr><tr><td>type</td><td>授权类型，分为 <code>basic</code> 和 <code>body</code> 两种。关于这两种授权方式可以参考<a href="https://docs.prestd.com/prestd/docs/api-reference/auth/" target="_blank" rel="noreferrer noopener">这篇文档</a>，其中 <a href="https://docs.prestd.com/prestd/docs/api-reference/auth/#bearer" target="_blank" rel="noreferrer noopener">Bearer</a> 即为这里的 <code>body</code> 类型</td></tr><tr><td>encrypt</td><td>密码加密方式，目前支持 <code>MD5</code> 和 <code>SHA1</code> 两种方式</td></tr><tr><td>table</td><td>存放用户名和密码的 PostgreSQL 表</td></tr><tr><td>username</td><td>上述 PostgreSQL 表中用于存放用户名的字段</td></tr><tr><td>password</td><td>上述 PostgreSQL 表中用于存放加密后密码的字段，例如用户密码为“12345”，加密方式为 <code>MD5</code> ，那么此列存放的值为“12345”的 MD5 <code>827ccb0eea8a706c4c34a16891f84e7b</code></td></tr></tbody></table>

为了简单起见，这里的授权类型选择了 `basic` ，密码加密方式选择 `MD5` ，在具体实践中应当针对自己的具体情况使用适合自己的配置。

在 `psql` 控制台中建表 `prestd_users` ，表中有两个字段 `username` 和 `password` ，分别用于存放用户名和密码，

```
CREATE TABLE prest.prestd_users (
    username VARCHAR(32),
    password CHAR(32)
);
```

然后插入用户，为了说明方便，这里随便起个名字 alice ，密码为 “ password ”，其 MD5 值为 `5f4dcc3b5aa765d61d8327deb882cf99` （[如何用命令行为字符串生成正确的 MD5 值？](https://superuser.com/a/71555)），

```sql
INSERT INTO prestd_users VALUES ('alice', '286755fad04869ca523320acce0dc6a4');
```

## 用令牌访问 prestd 接口

首先通过 `/auth` 获得令牌，

```shell
~ » curl -i -X POST http://127.0.0.1:3000/auth --user "alice:password"
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sat, 19 Mar 2022 22:36:02 GMT
Content-Length: 294

{"user_info":{"id":0,"name":"","username":"alice","metadata":null},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6MCwibWV0YWRhdGEiOm51bGwsIm5hbWUiOiIiLCJ1c2VybmFtZSI6ImFsaWNlIn0sImV4cCI6MTY0Nzc1MDk2MiwibmJmIjoxNjQ3NzUwOTYyfQ.PK-xPgRe0W4abaQmKlLuptruM49CvuLu1klDXGAY8q0"}
```

然后用获取的令牌获得所有的数据表，

```shell
~ » curl http://localhost:3000/tables -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6MCwibWV0YWRhdGEiOm51bGwsIm5hbWUiOiIiLCJ1c2VybmFtZSI6ImFsaWNlIn0sImV4cCI6MTY0Nzc1MDk2MiwibmJmIjoxNjQ3NzUwOTYyfQ.PK-xPgRe0W4abaQmKlLuptruM49CvuLu1klDXGAY8q0"
[{"schema":"prest","name":"persons","type":"table","owner":"prest"},
 {"schema":"prest","name":"persons_id_seq","type":"sequence","owner":"prest"},
 {"schema":"prest","name":"prestd_users","type":"table","owner":"prest"}]
```

# 缓存配置

pRESTd 也允许用户配置[缓存](https://docs.prestd.com/prestd/deployment/cache/)以加速查询响应速度，它将 [BuntDB](https://github.com/tidwall/buntdb) 作为自己的缓存数据库，在收到一条请求时，优先去缓存中查找，如果结果存在则直接返回，不存在的话才去访问数据库，我们通常认为在简单查询方面 KV 数据库的响应速度要快于 SQL 查询，并且在正常的架构中缓存距离 API 比后台数据库（在我们这里是 PostgreSQL ）更近，因此这样既减少了 API 返回时间，也降低了后台数据库的查询压力。如果 pRESTd 被部署用于大量查询，非常推荐配置缓存。

缓存的介绍在官网上讲解得比较详细，在此不再赘述每个参数的含义。仿照网上的例子，在配置文件中加入如下内容，

```
[cache]
enabled = true
time = 10
storagepath = "./"
sufixfile = ".cache.prestd.db"

    [[cache.endpoints]]
    endpoint = "/prestd/prest/persons"
    time = 5
```

在这里我们告诉 pRESTd ，需要缓存数据表 `prest.persons` 的全表扫描内容。接下来，我们在表中插入一条数据，

```sql
INSERT INTO persons (name, age, gender) VALUES ('Bob', 20, 'male');
```

然后发送几条请求比较一下 API 响应速度，

```shell
~ » curl http://localhost:3000/prestd/prest/persons -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6MCwibWV0YWRhdGEiOm51bGwsIm5hbWUiOiIiLCJ1c2VybmFtZSI6ImFsaWNlIn0sImV4cCI6MTY0Nzc1MDk2MiwibmJmIjoxNjQ3NzUwOTYyfQ.PK-xPgRe0W4abaQmKlLuptruM49CvuLu1klDXGAY8q0"
[{"id":1,"name":"Bob","age":20,"gender":"male"}]%
------------------------------------------------------------
~ » curl http://localhost:3000/prestd/prest/persons -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6MCwibWV0YWRhdGEiOm51bGwsIm5hbWUiOiIiLCJ1c2VybmFtZSI6ImFsaWNlIn0sImV4cCI6MTY0Nzc1MDk2MiwibmJmIjoxNjQ3NzUwOTYyfQ.PK-xPgRe0W4abaQmKlLuptruM49CvuLu1klDXGAY8q0"
[{"id":1,"name":"Bob","age":20,"gender":"male"}]
```

在 pRESTd 的输出日志上我们可以看到，响应速度的提升非常明显，访问缓存数据所花的时间只需要之前的大约三分之一。

```
...
[negroni] 2022-03-19T15:51:52-07:00 | 200 | 	 36.957871ms | localhost:3000 | GET /prestd/prest/persons
[negroni] 2022-03-19T15:51:56-07:00 | 200 | 	 13.677279ms | localhost:3000 | GET /prestd/prest/persons
...
```

# 参考资料

- [https://docs.prestd.com/](https://docs.prestd.com/)
