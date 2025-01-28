---
title: 在 Amazon Linux 2 上运行 PostgreSQL
pubDate: 2020-04-09 22:44 PST
categories: ["聊聊技术"]
tags: AWS, PostgreSQL, Amazon Linux 2, 运维
heroImage: /images/blog/amazon-toy-scaled.jpg
heroImageDescription: Photo by Daniel Eledut on Unsplash
---

> 中国有一句话叫“闷声大发财”

用过 AWS 的人都知道，想用他们家的 PostgreSQL 数据库的话，每个月的起价是十五块钱，但作为小本生意，也没有一个数据，上来就一个月十五块着实有些铺张，扭脸一看，他们的 EC2 服务器最便宜一个月只要三块五，所以个人项目想用 PostgreSQL ，何不自己搭一个呢？

在 Linux 系统上运行 PostgreSQL 的教程很多，找起来不费吹灰之力，所以这篇文章主要记录一个不太好找教程的系统—— [Amazon Linux 2](https://aws.amazon.com/cn/amazon-linux-2/) 。顾名思义，这是 Amazon 自己基于 CentOS 魔改的一个的 Linux 发行版，但和 CentOS 不同，上来就执行 `yum install` 是搞不定的。这也是为什么写作本文，简单整理一下安装运行过程的目的。

首先假设我们有了一台最便宜的 EC2 ，运行 Amazon Linux 2 ，也就是下图这个系统

<figure>

![](/images/blog/amazon-linux-2-image.png)

<figcaption>

Amazon Linux 2

</figcaption>

</figure>

其他的配置不再赘述，根据自己的需要配置即可。

Amazon Linux 2 提供了一个 [amazon-linux-extras](https://aws.amazon.com/cn/amazon-linux-2/faqs/) 工具，可以在保证系统稳定运行的同时，使其上运行的软件尽量保持最新，避免每次升级时候的要仔细阅读软件的发布文档，最后升级的时候还要小心翼翼随时准备回滚，对于我这样的运维小白是很友好的。先看看 PostgreSQL 支持到哪个版本了

```shell
amazon-linux-extras list
 ...
 41  postgresql11             available    [ =11  =stable ]
 ...
```

目前最新的版本其实是12，但11也已经足够新了，我们来 enable 它

```shell
sudo amazon-linux-extras enable postgresql11
 ...
 41  postgresql11=latest      enabled      [ =11  =stable ]
 42  php7.4                   available    [ =stable ]

Now you can install:
 # yum clean metadata
 # yum install postgresql
```

然后一次安装所有需要的组件

```shell
sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs
```

初始化数据库并启动服务

```shell
sudo postgresql-setup initdb
```

这个时候启动服务也是连不上数据库的，我们还有个配置文件要改，否则在用 psql 命令连接的时候会说

```shell
psql: FATAL:  Peer authentication failed for user "postgres"
```

打开文件 `/var/lib/pgsql/data/pg_hba.conf` ，把原有的内容改成

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                    	trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     trust
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5
```

这个时候再用 `systemd` 启动服务

```shell
sudo systemctl start postgresql
```

然后执行 psql 命令，熟悉的界面就出现了

```shell
psql -U postgres

psql (11.5)
Type "help" for help.

postgres=#
```

回到 AWS 控制台界面，把这台刚刚配置好的 EC2 机器加到打开了 5432 端口的安全组中，一个便宜可靠的 PostgreSQL 数据库服务就建好了。

# 参考资料

- [https://aws.amazon.com/cn/amazon-linux-2/faqs/](https://aws.amazon.com/cn/amazon-linux-2/faqs/)
- [https://github.com/snowplow/snowplow/wiki/Setting-up-PostgreSQL#ec2](https://github.com/snowplow/snowplow/wiki/Setting-up-PostgreSQL#ec2)
