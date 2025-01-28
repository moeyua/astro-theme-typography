---
title: 如何给 WordPress 站启用 HTTP/2
pubDate: 2019-09-01 23:03 PST
categories: ["聊聊技术"]
tags: 运维, Apache, http2, WordPress
heroImage: /images/blog/switch-cable-http2.jpg
heroImageDescription: Photo by Jonathan on Unsplash
---

早在 2015 年， [HTTP/2](https://zh.wikipedia.org/wiki/HTTP/2) 标准正式制定完成，同年也出现了很多浏览器支持这种新一代的 HTTP 标准。关于 HTTP/2 的详细介绍可以在维基百科中找到，这篇[知乎专栏](https://zhuanlan.zhihu.com/p/26559480)也是一篇不错的讲解。对于用户来说，一个最直接的印象就是启用了 HTTP/2 的网站打开速度快了许多，这是因为 HTTP/2 协议支持在同一个 TCP 连接中同时发起多个请求，这样服务器同时返回多个资源，比如说 JavaScript 代码文件，图片、视频资源等。

这篇记录文字假设 WordPress 站已经启用了 HTTPS ，详细过程可以参考之前写的一篇[短文](https://old-panda.com/posts/digitalocean-wordpress-https)。因为用的是 DigitalOcean 一键安装的 WordPress ，所以代理服务器用的是 Apache 。 Apache 从 2.4.17 版本开始支持 HTTP/2 ， Ubuntu 16.04 默认安装的是 2.4.18 ，按说没问题，但一旦执行 `sudo a2enmod http2` 就会说 `ERROR: Module http2 does not exist!` 这样不成，我们需要重新安装带 HTTP/2 模块的 Apache

```shell
sudo add-apt-repository ppa:ondrej/apache2
sudo apt update && sudo apt upgrade
sudo a2enmod http2
sudo service apache2 restart
```

之后再运行 `a2enmod http2` 的话终端就会显示 `Module http2 already enabled`。剩下的操作就比较顺理成章了，编辑 Apache 的配置文件（我的配置文件在/etc/apache2/sites-available/000-default-le-ssl.conf），添加一句 `Protocols h2 http/1.1` ，意思是优先 HTTP/2 协议，否则就走 HTTP/1.1 。修改后的文件大致是这个样子的

```
<IfModule mod_ssl.c>
<VirtualHost *:443>
        Protocols h2 http/1.1
        ServerAdmin webmaster@localhost
        ...
</VirtualHost>
</IfModule>
```

然后重启 Apache ，发现请求还是通过 HTTP/1.1 发出去的，然后参考了[这篇文章](http://yeah.moe/p/ed1475fb/)修复了 PHP mpm 模块与 Apache HTTP2 不兼容的问题，我不是 PHP 工作者，但我已经见得太多了，留下这点儿微小的经验，避免以后掉进同样的坑里。
