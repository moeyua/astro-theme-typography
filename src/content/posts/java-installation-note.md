---
title: Java 在 MacOS 环境下的安装与卸载
pubDate: 2019-09-17 23:30 PST
categories: ["聊聊技术"]
tags: Java, MacOS
heroImage: /images/blog/java-coffee.jpg
heroImageDescription: Photo by wu yi on Unsplash
---

如题所言，这个操作看起来很无聊，但实施起来还是挺繁琐的，避免每次去谷歌上搜，摘抄过来留作自己的笔记。

#### 卸载

这个步骤很重要，比如说误装了 Oracle 提供的 jdk ，要是没细看使用条款，分分钟律师函就过来了。我在 StackOverflow 上发现了一个[答案](https://stackoverflow.com/a/23092014/2191173)，抄录过来。

运行如下命令删除 jdk

```shell
sudo rm -rf /Library/Java/JavaVirtualMachines/jdk<version>.jdk
```

如果想删除插件的话，运行下面的一堆命令

```shell
sudo rm -rf /Library/PreferencePanes/JavaControlPanel.prefPane
sudo rm -rf /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
sudo rm -rf /Library/LaunchAgents/com.oracle.java.Java-Updater.plist
sudo rm -rf /Library/PrivilegedHelperTools/com.oracle.java.JavaUpdateHelper
sudo rm -rf /Library/LaunchDaemons/com.oracle.java.Helper-Tool.plist
sudo rm -rf /Library/Preferences/com.oracle.java.Helper-Tool.plist
```

#### 安装

自然是要安装 openjdk ，避免很多不必要的麻烦，恰好在 StackExchange 上也有个[答案](https://apple.stackexchange.com/a/334385)。

默认是安装最新版本的 jdk

```shell
brew cask install adoptopenjdk
```

当然也可以指定版本

```shell
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
brew cask install adoptopenjdk9
```

目前最常用的还是 Java 8 ，但我在执行 `brew cask install adoptopenjdk8` 时说

```shell
~ » brew cask install adoptopenjdk8
Error: Cask adoptopenjdk8 exists in multiple taps:
  caskroom/versions/adoptopenjdk8
  adoptopenjdk/openjdk/adoptopenjdk8
```

我的理解是随便挑一个安装即可，换成 `brew cask install adoptopenjdk/openjdk/adoptopenjdk8` 就行了。
