---
title: 如何给 DigitalOcean 一键安装的 WordPress 加 https
pubDate: 2017-09-05 22:13:00 PST
categories: ["聊聊技术"]
tags: Certbot, https, Let's Encrypt, WordPress, DigitalOcean
heroImage: /images/blog/network-switch.jpg
heroImageDescription: Photo by Thomas Jensen on Unsplash
---

https 的重要性不言而喻，开了博客之后就寻思着怎样去弄一个证书，后来发现了方便易用的 [Let's Encrypt](https://letsencrypt.org/) 。限于我还是建站新手，从发现这个工具到弄明白怎么用再到真正把网站挂上 https 还是费了一番功夫的，为了表示我还要学习一个，随便记录一下过程。

1. 为避免以后 DigitalOcean 可能的更新，导致版本不符令人迷惑，截图说明我安装的 WordPress 是如下这个版本 ![](/images/blog/kZYJhXU.png)
2. 该版本的 WordPress 运行在 Apache 上，在 Let's Encrypt 的 [Getting Started](https://letsencrypt.org/getting-started/) 链接中提到，在 shell 中可以用一个叫 [Certbot](https://certbot.eff.org/) 的工具来获得证书，选项如下图所示 ![](/images/blog/N90weqK.png)
3. 把网页上自动生成的脚本抄一遍就好了

因为这样生成的证书只有90天的有效期，所以 Certbot 建议设置一个定时任务来自动更新。
