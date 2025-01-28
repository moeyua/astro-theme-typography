---
title: 利用最近的闲暇，重新上线了 MPAA 电影分级插件
pubDate: 2020-05-11 21:57 PST
categories: ["随便聊聊"]
tags: AWS, Amazon API Gateway, AWS Lambda, MPAA, Go, Chrome, Firefox, Edge, PostgreSQL, MPAA, 插件, 豆瓣
heroImage: /images/blog/movie-projector-ii-scaled.jpg
heroImageDescription: Photo by Noom Peerapong on Unsplash
---

两年前开发了一款名为《 MPAA 电影分级》的插件，但当时忙着跳槽，加上新公司的各种事情，需要快速上手并有所产出，一度非常忙碌，于是渐渐疏忽了插件的维护工作，后来觉得实在力不从心，每个月服务器又在烧钱，干脆关停了一阵子。最近因为疫情，加州全体居家搬砖，省出来不少通勤的闲暇和精力，于是我重新上线了这款插件。

当时开发这个插件的动机很单纯，就是给影迷提供一个观影参考，也希望为我们自己的电影分级工作做一些微小的贡献，初衷在[之前的文章](https://old-panda.com/posts/mpaa-rating-extension/)里具体提到了，这里不再赘述。

这篇文章主要记录一下技术栈上的转变，毕竟这算是自己的本行，自己闲着没事不折腾新东西，生活就太无聊了。之前我的 Web 框架使用的是 [Flask](https://flask.palletsprojects.com/en/1.1.x/) ，由它提供几个 API ，然后作为前端的浏览器插件检测到了豆瓣电影页面，就抓取页面上电影的相关信息，通过 HTTP 请求获取该电影的分级，然后把结果显示在页面上。但一来为了省钱，二来为了把自己从无穷的运维工作中解放出来，在最近的升级中，我把后台 API 换成了由 [AWS API Gateway](https://aws.amazon.com/cn/api-gateway/) + [AWS Lambda](https://aws.amazon.com/cn/lambda/) 来提供，并且用 Go 重写了后端的代码，具体的操作过程可以参考[这篇教程](https://old-panda.com/posts/lambda-api-gateway-note/)。

数据存储没有变，还是用的 [PostgreSQL](https://www.postgresql.org/) 作为数据库，唯一大改的就是从 Python 换成了 Golang ，数据格式早在两年之前就已经设计好了，不需要怎么动，但数据库运行的地方换了。早先用过一阵子 [AWS RDS](https://aws.amazon.com/cn/rds/) ，但亚马逊帮忙维护的数据库实在太贵了，所以我自己建了一个数据库服务器，把它放到和 Lambda 函数同一个 [VPC](https://docs.aws.amazon.com/vpc/index.html) 中，作为后端的 Lambda 函数就能轻松拿到数据了。关于自建 PostgreSQL 数据库服务器，我在[这篇文章](https://old-panda.com/posts/amazon-linux-2-postgresql/)中记录了详细的过程。

这款插件已经在 [Chrome 商店](https://chrome.google.com/webstore/detail/mpaa-%E7%94%B5%E5%BD%B1%E5%88%86%E7%BA%A7/dnjigceoecdajpgbjemglmhhboleipfg)和 [Microsoft Edge 商店](https://microsoftedge.microsoft.com/addons/detail/ejdnefhnhjkofmbnnfeecpbpbkkjmehf)上架，并且除了豆瓣之外，也支持了腾讯视频。

很惭愧，就做了一点微小的工作，谢谢大家！
