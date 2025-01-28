---
title: AWS Lambda + API Gateway 搭建 Restful API 折腾记录
pubDate: 2020-03-02 23:20 PST
categories: ["聊聊技术"]
tags: AWS, Go, Amazon API Gateway, AWS Lambda, 运维
heroImage: /images/blog/books-scaled.jpg
heroImageDescription: Photo by Ed Robertson on Unsplash
---

最近自己在家搞小玩具，有一个前后端交互的需求，毫无疑问应该用 Restful API 来进行通信。然而根据之前的经验，在 AWS 上最便宜的机器也要一个月三块五毛钱，对于我这种玩具项目来说太过奢侈，所以就想到了 [AWS Lambda](https://aws.amazon.com/lambda/) ，兼具价格低廉和无需维护的优点。每个月前一百万次请求免费，之后每一百万次请求收费两毛，再合适（便宜）不过了。

由于暂时不打算透露这个玩具项目具体是做啥的，但又想尽可能详细地记录下搭建的过程，这里我会用一个简单的 ISBN 10 转换到 ISBN 13 的 API 为例。选择 Go 语言作为编写工具，主要是因为我之前开发过一个 [ISBN 格式转换的库](https://github.com/OldPanda/go-isbn)，可以拿来即用。

## Lambda 函数的配置

首先，创建一个新的 Lambda 函数

![](/images/blog/lambda-api-gateway-image.png)

名字随便起一个，叫 `isbnConverter` ， Runtime 选择 `Go 1.x` 。然后需要为 Lambda 函数添加触发器，选择 API Gateway ，然后出现如下所示的界面。

![](/images/blog/lambda-api-gateway-image-1.png)

似乎 HTTP API 是个新东西，更加轻量，对账单更加友好，反正这次是尝试新鲜事物，所以选择这个。如果打算求稳，建议用右边的 REST API ，但目测两者的使用上不会有太大不同。创建完成后，页面自动跳转回 Lambda ，可以看到在下方出现了一个 API Gateway 的板块，同时也提供给我们一个 API 可以调用，格式类似于

```
https://*******.execute-api.us-west-2.amazonaws.com/default/isbnConverter
```

在浏览器中打开，可以得到一个字符串 `Hello from Lambda!` ，说明我们的 API 成功 Ping 通了！

## API Gateway 的配置

我们当然不满足于此，我们希望能把 10 位的 ISBN 号转换成对应的 13 位。先来配置 API Gateway ，然后编写相关的代码。到 API Gateway 的路由配置页面，将 endpoint 接受的方法从 `ANY` 改成 `GET` ，因为只是一个简单的转换，不需要支持那么多花里胡哨的方法。

![](/images/blog/lambda-api-gateway-image-2.png)

然后发送几个请求确保设置生效了

```shell
~ » curl https://*******.execute-api.us-west-2.amazonaws.com/default/isbnConverter
Hello from Lambda!%
~ » curl -XPOST https://*******.execute-api.us-west-2.amazonaws.com/default/isbnConverter
{"message":"Internal Server Error"}%
~ » curl -XOPTION https://*******.execute-api.us-west-2.amazonaws.com/default/isbnConverter
{"message":"Internal Server Error"}
```

当然这个 `Internal Server Error` 的迷惑性很大，但我还没有研究透如何能自定义 HTTP API 的返回状态，按下不表，总之，这里已经达到想要的效果了。

刚刚我们发请求的时候，不得不写下这一长串的 `https://**_*_**.execute-api.us-west-2.amazonaws.com` ，自己手头既然有域名，为什么不直接绑定上去呢？ API Gateway 提供了这样的功能，找到自定义域名，把想要绑定的域名加上去，因为是一个 API endpoint ，所以决定使用 `api.old-panda.com`

![](/images/blog/lambda-api-gateway-image-3.png)

ACM 证书可以用 [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) 签一个，操作非常直观方便。接下来还要给自定义域名添加路径映射，我添加的是

![](/images/blog/lambda-api-gateway-image-4.png)

这样当我们访问 `https://api.old-panda.com/book` 的时候，会被自动替换为 `https://**_*_**.execute-api.us-west-2.amazonaws.com/default` 。要达到最后的效果，还差一步，就是 DNS 配置，否则当看到 `api.old-panda.com` 时，域名服务器无从解析到 AWS 为我们自动生成的地址。到 [AWS Route 53](https://aws.amazon.com/route53/) 添加一条新的 CNAME 记录，子域名自然是 `api.old-panda.com` ，映射到的目标地址是 API Gateway 自定义域名界面上的 **Target Domain Name** ，这里很容易跟 API 页面的 **Invoke URL** 混淆，这俩 URL 的格式非常相似，再次强调， DNS 的 CNAME 配置要映射到自定义域名界面上的 **Target Domain Name** 而**不是** **Invoke URL**！

验证配置效果

```shell
~ » curl https://api.old-panda.com/book/isbnConverter
Hello from Lambda!
```

## 编码

因为上面已经决定了， API 只支持 GET 请求，所以传入 ISBN10 的方式也就只能通过 URL 参数（我知道还有其他的方式诸如把数据塞在请求头里，但一般没人那么干），比如说

```
https://api.old-panda.com/book/isbnConverter?isbn10=7532736555
```

因此代码首先要拿到 URL 中的参数 `isbn10` 。首先在代码中定义 URL 参数的格式， Lambda 函数收到的事件格式是一个 `json` ，其中有一个域 `queryStringParameters` 包含所有的 URL 参数，所以很容易能写出如下两个结构体

```go
type requestParams struct {
    QueryStringParameters isbnParam `json:"queryStringParameters"`
}
type isbnParam struct {
    ISBN10 string `json:"isbn10,omitempty"`
}
```

对照[官方文档](https://docs.aws.amazon.com/lambda/latest/dg/golang-handler.html)， Handler 函数的签名选择 `func (context.Context, TIn) (TOut, error)` ，因为我们希望得到一个 json 格式的输入（ `TIn` ）同时返回转换后的结果（ `TOut` ）。结合 [go-isbn 库](https://github.com/OldPanda/go-isbn)， ISBN 码的转换函数很快就写好了

```go
func HandleLambdaEvent(ctx context.Context, eventJSON json.RawMessage) (response, error) {
    var params requestParams
    if err := json.Unmarshal(eventJSON, &params); err != nil {
        return response{
            StatusCode: http.StatusBadRequest,
            Body:       fmt.Sprintf(`{"error": "failed to parse url parameters: %v\nError: %v"}`, string(eventJSON), err),
            Headers: headers{
                ContentType: "application/json",
            },
        }, nil
    }

    isbn10 := params.QueryStringParameters.ISBN10
    if isbn10 == "" {
        errMsg := "isbn10 is not given"
        log.Error(errMsg)
        return response{
            StatusCode: http.StatusBadRequest,
            Body:       fmt.Sprintf(`{"error": "%s"}`, errMsg),
            Headers: headers{
                ContentType: "application/json",
            },
        }, nil
    }

    isbn13, err := isbn.ConvertToIsbn13(isbn10)
    if err != nil {
        errMsg := fmt.Sprintf("Cannot convert given isbn10: %v to isbn13", isbn10)
        log.Warn(errMsg)
        return response{
            StatusCode: http.StatusInternalServerError,
            Body:       fmt.Sprintf(`{"error": "%s"}`, errMsg),
            Headers: headers{
                ContentType: "application/json",
            },
        }, nil
    }

    return response{
        StatusCode: http.StatusOK,
        Body:       fmt.Sprintf(`{"isbn13": "%s"}`, isbn13),
        Headers: headers{
            ContentType: "application/json",
        }}, nil
}
```

完整的代码以及 go.mod 文件我放在了 [GitHub](https://github.com/OldPanda/isbn10-converter-sample) 。

## 部署

同样通过参考[官方文档](https://docs.aws.amazon.com/lambda/latest/dg/golang-package.html)，很容易将本地的 Go 程序部署上线。

```shell
BUILD_BIN="isbn10-converter"
GOOS=linux go build -o $BUILD_BIN
zip function.zip $BUILD_BIN
aws lambda update-function-code --function-name isbnConverter --zip-file fileb://function.zip
```

检验 API 返回结果

```shell
curl https://api.old-panda.com/book/isbnConverter\?isbn10\=7532736555
"9787532736553"
```

这样一个简单的 Restful API endpoint 就搭建好了。

## 一点儿闲话

在本文中用作示例的 ISBN 号 `7532736555` 是我非常喜欢的一本[名人传记](https://neodb.social/book/18tz8wjcqHUWtZdjpddWlu)，于 2018 年回家的时候有幸拜读，令我学习到了不少人生的经验。在这里强烈推荐👍。
