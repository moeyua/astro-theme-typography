---
title: 用 Cobra 写一个命令行工具
pubDate: 2022-02-12 22:24 PST
categories: ["聊聊技术"]
tags: cli, Cobra, Go, 调度场算法
heroImage: /images/blog/abacus-1.jpeg
heroImageDescription: Photo by https://pixabay.com/photos/abacus-asian-culture-counting-frame-7019994/
---

[Cobra](https://github.com/spf13/cobra) 是一款非常流行的命令行生成工具，由 Go 语言实现，比如说著名的博客工具 [Hugo](https://gohugo.io/) ， [GitHub 命令行](https://github.com/cli/cli)等都是用它实现的。

一直以来我只是闻其名，却没有真正用过。最近入职了新公司，简单熟悉了新组的代码库之后，发现整个框架就是用 Cobra 搭起来的，虽然本质上是各种复杂的服务，但 Cobra 可以为用户提供一套非常简单有效的命令行工具来操作它们。因此借着这个机会，趁周末放假，我在自己的机器上实现了一个简单的命令行工具来计算输入的数学表达式，以此来熟悉一下这个大名鼎鼎的命令行构建工具。

## 需求

需求很简单，输入一段数学表达式，能够输出正确结果，比如说 `1 + 2` 得到 `3` ，支持加减乘除和指数计算，包括小括号。

因为只是练习之作，这个小玩具就简单粗暴地命名为 `suan` ，取汉字“算”的拼音。

## 环境

我的 Go 版本如下所示，

```shell
» go version
go version go1.17.7 darwin/amd64
```

## 过程

### 初始化环境

在期望新建项目的位置初始化 Go 项目目录，

```shell
mkdir suan && cd suan
go mod init github.com/OldPanda/suan
```

然后按照[官网说明](https://github.com/spf13/cobra#installing)安装 Cobra ，

```shell
go get -u github.com/spf13/cobra
```

到本文撰写为止， Cobra 的版本为 `[v1.3.0](https://github.com/spf13/cobra/releases/tag/v1.3.0)` 。

### 实现命令行

Cobra 本身提供了一套功能齐全的命令行生成器工具来管理项目，比如自动初始化项目，添加子命令等，所以没有必要自己新建 `main.go` 文件从零开始编写。按命令行生成器[说明书](https://github.com/spf13/cobra/blob/master/cobra/README.md)所言，只需要执行

```shell
cobra init
```

Cobra 就可以自动生成必要的 go 文件。此时的文件结构如下所示，

```shell
» tree .
.
├── LICENSE
├── cmd
│   └── root.go
├── go.mod
├── go.sum
└── main.go
```

可以发现，这里多了几个文件（夹）， LICENSE 与我们的代码功能无关，不用管它。 `main.go` 的内容很简单，就是把命令行（ `cmd` ）从子文件夹 `cmd` 中拿出来然后执行，

```go
package main

import "github.com/OldPanda/suan/cmd"

func main() {
	cmd.Execute()
}
```

而 `cmd/root.go` 就是要实现的命令行核心所在了。首先，它定义了一个全局变量 `rootCmd` ，其中的 `Use` 即为命令行的名字，在这里它的值为 `"suan"` ， `Short` 和 `Long` 顾名思义，为命令行功能的描述。按照注释中的说明，把 `Run` 的内容反注释掉，然后编辑函数为如下内容，

```go
Run: func(cmd *cobra.Command, args []string) {
	fmt.Println("hello run")
},
```

此时运行 `go run main.go` ，屏幕上会输出

```shell
» go run main.go
hello run
```

当然也可以直接安装可执行文件，

```shell
» go install
» suan
hello run
```

这时命令 `suan` 已经被安装到了 `GOPATH` 下，

```shell
» which suan
$GOPATH/bin/suan
```

文件中还有其他两个函数 `Execute()` 和 `init()` ，前者就是在 `main.go` 文件中调用的函数，里面的 `rootCmd.Execute()` 这一行会自动执行 `[cobra.Command](https://github.com/spf13/cobra/blob/v1.3.0/command.go#L38)` 类型中的 `RunE` 或者 `Run` 中的内容，在其[结构体定义](https://github.com/spf13/cobra/blob/v1.3.0/command.go#L38-L225)中还有很多其他属性，在此不一一赘述。而后者在引入该 go package 的时候会被自动执行，所以通常在 `init()` 中定义命令行的各种 flag 。在这里不需要太复杂的 flag ，只需要可以输出命令行版本就可以了，

```go
func init() {
	rootCmd.Flags().BoolP("version", "v", false, "Version information")
}
```

到这里我们已经熟悉了 Cobra 自动生成的文件的结构和基本的执行逻辑，可以往里填数学算式的计算逻辑了。

一般来说，拿到一个类似于 `1 + 2` 一样的中序表达式，将其转换为[逆波兰式](https://en.wikipedia.org/wiki/Reverse_Polish_notation)对于计算机来说更容易计算，在这里可以利用[调度场算法](https://old-panda.com/posts/shunting-yard-algorithm)得到一个算式的逆波兰式版本，然后接下来的步骤就非常简单了。所以需要定义一个函数，在 `cobra.Command` 中 `Run` 对应的函数中调用，输入为字符串类型的中序数学算式，输出为计算结果和可能的错误，具体如下，

```go
func calculate(expression string) (float64, error) {
	// step1: get reverse polish notation from infix expression
	rpn, err := generateRPN(expression)
	if err != nil {
		return 0.0, err
	}

	// step2: calculate reverse polish notation
	return calculateRPN(rpn)
}
```

接下来只要分别实现 `generateRPN` 和 `calculateRPN` 就可以了，因为代码较长，在这里不再占用文章内容，我把完整的代码放在了 [GitHub](https://github.com/OldPanda/suan) 上，当然也可以参考[另一篇文章](https://old-panda.com/posts/shunting-yard-algorithm)中的 Python 实现。

## 参考资料

- [Cobra Readme](https://github.com/spf13/cobra#readme)

- [Cobra 命令生成器说明](https://github.com/spf13/cobra-cli/blob/main/README.md)

- [How to create a CLI in golang with cobra](https://towardsdatascience.com/how-to-create-a-cli-in-golang-with-cobra-d729641c7177)
