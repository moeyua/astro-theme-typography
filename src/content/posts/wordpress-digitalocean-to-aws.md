---
title: 把博客从 DigitalOcean 搬到了 AWS
pubDate: 2020-02-03 21:47 PST
categories: ["聊聊技术"]
tags: AWS, DigitalOcean, https, WordPress, 博客迁移, Amazon Lightsail
heroImage: /images/blog/above-cloud-scaled.jpg
---

> 我一个 DigitalOcean 的用户，怎么就转移到了 AWS 呢？

## 起因

一开始我没有考虑过这个事情，用了 DigitalOcean 好几年，对它的服务一直非常满意，尤其是上面各种详尽的文档教程，让我这个非专业运维也成功运行了这个小网站好几年，也逐步的上了 HTTPS 、 ipv6 、 HTTP2 ，至少看起来像那么回事了。

后来偶然一次在 AWS 界面闲逛，发现了 [Lightsail](https://aws.amazon.com/lightsail/) 这个服务，有点儿类似于 DigitalOcean 的 Marketplace ，也提供了一些常用的软件预装在云服务器上，关键是比 DigitalOcean 便宜了许多。[当年](https://old-panda.com/posts/hello-world/) DigitalOcean 给我开的价是一个月十块钱，后来我给博客加了个备份，文件放在他们自家的 [Space](https://www.digitalocean.com/docs/spaces/) 上，起步价五块一个月，这样下来维护这个网站一个月的开销就是十五块。然而同样的服务如果用 AWS 的话，就少了十块钱还多（对不起，实在太穷了）。下表是一个简单的价格比较。

<table><tbody><tr><td>云服务商</td><td class="has-text-align-center" data-align="center"><img class="wp-image-634" style="width: 200px;" src="/images/blog/DO_Logo_Horizontal_Blue.png" alt=""></td><td class="has-text-align-center" data-align="center"><img class="wp-image-636" style="width: 100px;" src="/images/blog/aws-logo.png" alt=""></td></tr><tr><td>服务器</td><td class="has-text-align-center" data-align="center">$10/月</td><td class="has-text-align-center" data-align="center">$3.5/月</td></tr><tr><td>备份存储</td><td class="has-text-align-center" data-align="center">$5/月</td><td class="has-text-align-center" data-align="center">$0.023/月</td></tr><tr><td>总计</td><td class="has-text-align-center" data-align="center">$15/月</td><td class="has-text-align-center" data-align="center">$3.523/月</td></tr></tbody></table>

所以结论是显而易见的。

## 过程

1. 在 Lightsail 创建一个 WordPress 实例，在下方选择最便宜的机器即可。![](/images/blog/lightsail-image-list.png)

3. 把原来 WordPress 博客上的内容迁移过来。我用了 [All-in-One WP Migration 插件](https://wordpress.org/plugins/all-in-one-wp-migration/)，将导出的文件下载到本地很简单，上传到新博客的时候可能会遇到上传文件大小的限制，插件本身有一篇文章介绍如何提高 WordPress 文件大小的上限，但我试了试不太管用，最后还是修改 `/opt/bitnami/php/etc/php.ini` 中的参数才搞定。具体来说，需要修改 `post_max_size` 和 `upload_max_filesize` 。之后需要重启服务才能生效，这一步可以参考 [bitnami 官方文档](https://docs.bitnami.com/aws/faq/administration/control-services/)的说明。

5. 配置 DNS 。这个很简单，去域名服务商那里把 DNS 服务器换成 AWS 上的，然后在 Lightsail 界面配置好 A 记录和 CNAME 记录就行了（其实就是抄的 DigitalOcean 上的配置）。因为每次重启机器 IP 会重新随机分配，建议配置一个静态 IP 。

7. 配置 HTTPS 。其他的可以省，这步省不了，所幸 Lightsail 已经为我们准备好了各种运维的工具，包括 Let's Encrypt 。操作很简单， `sudo /opt/bitnami/bncert-tool` ，接下来的步骤就是轻车熟路了。

## 参考资料

- [如何提高我的 Lightsail Bitnami WordPress 实例中的 PHP 上传大小限制？](https://aws.amazon.com/cn/premiumsupport/knowledge-center/lightsail-bitnami-wordpress-upload-limit/)
