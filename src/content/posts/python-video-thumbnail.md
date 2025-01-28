---
title: 用 Python 代码生成视频的缩略图
pubDate: 2019-10-01 22:03 PST
categories: ["聊聊技术"]
tags: Python, Reddit, FFmpeg
heroImage: /images/blog/girl-camera.jpg
heroImageDescription: Photo by Kit Junglist on Unsplash
---

最近写了个 Reddit 发帖辅助工具，因为涉及视频的上传及标注出处来源，所以一个简单的脚本可以大大减轻我的工作量，出于糙快猛的考虑，自然而然就是 Python 了。

Reddit 上目前充斥着各种机器人账号，官方也非常支持这种行为，只要不是无意义的发言，机器人多了还能增加活跃度，吸引真人用户一起来各抒己见，比如说在“旧金山湾区”板块上每周都有一个题为[“烦人的星期二”的帖子](https://www.reddit.com/r/bayarea/comments/snp06h/terrible_tuesday_covid19_edition/)，就是大伙儿吐槽生活中种种烦心事的好地方。因此 Reddit 提供了一整套开发者 API ，同时 SDK 也不难找，这里有一个详尽的[列表](https://github.com/reddit-archive/reddit/wiki/API-Wrappers)，大家可以根据自己的语言喜好随意取用。

脚本很简单，真正的困难在于视频上传， Reddit 的要求很特殊，有了帖子标题和视频路径还不够，还需要提供一张缩略图， [SDK 的文档](https://github.com/praw-dev/praw/blob/master/praw/models/reddit/subreddit.py#L804-L806)也说了，如果不提供，就会自动上传一张他们的 Logo 作为视频的缩略图。这个时候，就需要祭出 [FFmpeg](https://www.ffmpeg.org/) 了。

### 安装

```shell
brew install ffmpeg
```

Python 也提供了 FFmpeg 的一层包装—— [ffmpy](https://ffmpy.readthedocs.io/en/latest/) ，这层包装本质上是把传入的参数翻译成命令行，调用 subprocess 来执行。比如说官网的示例

```python
>>> import ffmpy
>>> ff = ffmpy.FFmpeg(
...     inputs={'input.mp4': None},
...     outputs={'output.avi': None}
... )
>>> ff.run()
```

本质上是在命令行中运行

```shell
ffmpeg -i input.mp4 output.avi
```

## 生成缩略图

简单写了个函数如下，给定视频路径，取第一帧作为缩略图，保存为 jpg 格式

```python
import ffmpy


def get_thumbnail_from_video(video_path):
    thumbnail_path = video_path.replace(".mp4", ".jpg")
    ff = ffmpy.FFmpeg(
        inputs={video_path: None},
        outputs={thumbnail_path: ['-ss', '00:00:00.000', '-vframes', '1']}
    )
    ff.run()
    return thumbnail_path
```

在这里我简单假设视频的格式都为 mp4 ，所以在路径上简单替换了下，没有进行更详尽的检查。同样地，本质上是在执行

```shell
ffmpeg -i video_path -ss 00:00:00.000 -vframes 1 thumbnail_path
```

这样发帖的时候同时给出视频和图片，一行命令搞定过去各种点击跳转的操作，十分方便。
