---
title: 用 Python Flask 和 ngrok 快速搭建一个可用的 web 服务
pubDate: 2017-09-27 14:39:00 PST
categories: ["聊聊技术"]
tags: DigitalOcean, Flask, ngrok, Python
heroImage: /images/blog/matrix.jpg
heroImageDescription: Photo by Markus Spiske on Unsplash
---

昨天公司为了让全体工程师测试即将发布的开发者平台，组织了一次 Hackathon ，平台主要支持移动开发（ iOS 和安卓），我没多大兴趣，但也支持集成自己的 API endpoint ，通过摸索，用了不到半个小时的时间用 [Python Flask](http://flask.pocoo.org/) 框架和 [ngrok](https://ngrok.com/) 在服务器上搭了一个简单的 web 服务，支持 https（这个功能当然是 ngrok 提供的），GET/POST 请求。今天趁着卧病在床，简单整理一下昨天做了些啥，以备后用。

简单步骤如下
1. 在 DigitalOcean 上开一个最便宜的服务器，这个每人喜好不同，但关键是便宜，毕竟只是一个 Hackathon
2. 把 [Flask 首页](http://flask.pocoo.org/) 上的代码抄到服务器上，以如下方法将 Flask 进程运行在后台

```shell
export FLASK_APP=hello.py
export FLASK_DEBUG=1
nohup flask run &
```

运行在后台是为了使 web 服务不会因为 ssh 断开而中断，开 debug 模式是保证每次对代码的修改都能及时更新。
3. Flask 服务默认绑定 5000 端口，运行 ngrok

```shell
./ngrok http 5000 > /dev/null &
```

这样就能保证 ngrok 运行在后台，同时分配的 url 不会因为多次启动而随机变化。然后查看 `localhost:4040/status` 获得 ngrok 自动分配的 url 。

这样一个简单的 web 服务就搭好了。
