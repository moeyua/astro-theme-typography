---
title: 会说话的数据—— D3.js 折腾小记
pubDate: 2019-02-05 01:48 PST
categories: ["聊聊技术"]
tags: D3.js, Data Visualization, Data-Driven Documents, Histogram, 数据可视化, 直方图
heroImage: /images/blog/data-chart.jpg
heroImageDescription: Photo by Isaac Smith on Unsplash
---

> 我一个写后端代码运维服务器的，怎么就去搞前端数据可视化了呢？

接触 [D3.js](https://d3js.org/) 纯属机缘巧合，但既然现在的工作跟数据打交道，数据的可视化总是不可避免的，学了总没什么坏处。由于是前端小白，所以不可避免的会掉入一些看起来很可乐的坑，因此随便写一篇小文章，记录一下自己折腾的过程。

## 起

D3 的名字由来从它的官网就能看出来， Data-Driven Documents ，三个 D ，不愿意发那么多音，所以这帮老外就简称 D3 。这套可视化工具还是挺流行的，比如说我最近在搞的 [Airflow](https://airflow.apache.org/) 就利用 D3 来进行一个 DAG 运行状态的可视化。具体举例来说， Airflow 利用 D3 进行一个 DAG 中每个任务运行时间的表示，代码可以参见[这里](https://github.com/apache/airflow/blob/master/airflow/www/templates/airflow/duration_chart.html#L30)。我也从官网上找到了一个示例图片，画出来还是很直观很漂亮的。

<figure>

![](/images/blog/duration.png)

<figcaption>

Task Duration Page

</figcaption>

</figure>

前端零基础，还想速成，一个好办法是从[官方示例](https://github.com/d3/d3/wiki/Gallery)入手，但 D3 的学习困难也在于此，目前 D3 的最新版本是 v5 ，但给出的示例所用的版本却是五花八门，例如这个 [Sequences sunburst](https://bl.ocks.org/kerryrodden/7090426) 用的是 v3 ， [NCAA Predictions](https://thepowerrank.com/visual/NCAA_Tournament_Predictions) 用的是 v2 ， [Bubble Chart](https://beta.observablehq.com/@mbostock/d3-bubble-chart) 用的又是最新版本。更要命的是，很多图形的代码不同版本之间互不兼容，并且还需要用户对前端知识有一定的了解，比如说 Bubble Chart 那个例子中，作者用这样一句来调用 D3

```javascript
d3 = require("d3@5")
```

我作为只会写最基本的 JavaScript 的小白自然要问，这个 `require` 是什么？所幸 Stack Overflow 上给出了详细的[答案](https://stackoverflow.com/a/9901097/2191173)。而一个对新手友好的文档/示例是不应该对读者作任何假设的，只需要读者对 JavaScript 有所了解足矣。

本篇文章将会采用最新版本的 D3 库，来逐步说明如何来画一个最简单的直方图，我会用有限的语文水平，从一个新手的视角，尽量根据自己的理解来解释每一块代码在做什么，如有不当之处，欢迎读者指正。

## 承

首先自然是“安装” D3 。图省事，我们就直接用 CDN 提供的 js 文件。这样我们就有了这样一个 HTML 文件，我将它命名为 `index.html` （文件名字可以随便叫，只要保证后缀是 `.html` 就行）。同时在同一个文件夹下创建一个子文件夹 `scripts` 来存放我们自己的 js 文件—— `main.js`

```html
<html>
  <head>
    <title>D3 Play</title>
  </head>
  <body>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src='./scripts/main.js'></script>
  </body>
</html>
```

谈到用 D3 画图，其实是通过 D3 这个工具去画 [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) （可缩放矢量图），关于 SVG 的具体教程可以看[这里](https://www.w3schools.com/graphics/svg_intro.asp)。在这篇小文章我们只关心直方图，即 [rect 标签](https://www.w3schools.com/graphics/svg_rect.asp)。那么问题来了，我们需要有个地方放这个 `svg` 结构，然后发现上述 HTML 文件中的 `body` 标签之间是个好地方，所以首先找到 `body` 标签，然后在其中插入 `svg`

```javascript
d3.select('body')
  .append('svg');
```

我们还需要指定这个 `svg` 区域的长和宽，继续添加 `width` 和 `height` 属性

```javascript
var svg = d3.select('body')
            .append('svg')
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight);
```

其中 `window.innerWidth` 和 `window.innerHeight` 指明图形的大小将会自动适应当前浏览器窗口的大小。到这里我们就得到了一个空白的 `svg` 结构，如果这时用浏览器打开 `index.html` 就会发现其内容变成了

```html
<html>
  <head>
    <title>D3 Play</title>
  </head>
  <body>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="./scripts/main.js"></script>
    <svg width="1440" height="328"></svg>
  </body>
</html>
```

可以看到多了一行 `<svg width="1440" height="328"></svg>` ，于是大胆猜想， D3 这套工具实质上就是一个对矢量图强化过的 DOM 操作工具，后续的一系列操作似乎也在逐步验证这个猜想。然后我们需要进行绘图，一般来说没人会把图案贴着框画，那样画出来的图不太好看，所以通常都会制定一个边缘大小，内部才是绘图区。同时趁此机会，设定好 x 轴 y 轴的范围。此时 `main.js` 文件如下所示

```javascript
var svg = d3.select('body')
            .append('svg')
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight);

const margin = 60;

var width = window.innerWidth - margin - margin;
var height = window.innerHeight - margin - margin;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var y = d3.scaleLinear().rangeRound([height, 0]);
```

这里的 `scaleBand()` 函数和 `scaleLinear()` 函数我没有深入了解，但根据 [D3 文档](https://github.com/d3/d3-scale#d3-scale)的说法，需要连续值的时候用 `scaleLinear()` ，需要离散值的时候用 `scaleBand()`，正好分别符合我们 y 轴和 x 轴的需求。至于 y 轴的范围设定为什么是 `height` 在前，这是因为按照浏览器的坐标，左上角为原点，向右 x 值逐渐增大，向下 y 值逐渐增大，是比较反直觉的一个情况。

通常 SVG 绘图需要一个 `g` 标签来表示一组图形，具体的文档说明可以参考[这里](http://tutorials.jenkov.com/svg/g-element.html)。代码如下

```javascript
var g = svg.append('g')
           .attr('transform', `translate(${margin}, ${margin})`);
```

在这里我们给 `g` 设定了一个属性 `transform="translate(margin, margin)"`，这表示我们把整个图形组向 x 轴正方向和 y 轴正方向同时移动了 `margin` 距离，因为我们之前给绘图区设定了一个边缘距离，所以这个平移确保了绘制的图形跟边框之间有这个距离。

## 转

绘图环境都设置好了，我们可以画图了。首先，要有数据

```javascript
const data = [12, 15, 43, 24, 94, 35, 38, 59];
```

其次，要在 x 轴和 y 轴上找到画图的位置，即直方图每个柱子的位置（ x 轴）及高度（ y 轴）

```javascript
x.domain([...Array(data.length).keys()]);
y.domain([0, d3.max(data, (d) => d)]);
```

题外话，这个 `[...Array(data.length).keys()]` 是我最近刚学到的一个小技巧，如何生成给定数组长度的从 0 开始的递增数组。运行结果如下

```javascript
> const data = [12, 15, 43, 24, 94, 35, 38, 59];
undefined
> [...Array(data.length).keys()];
[ 0, 1, 2, 3, 4, 5, 6, 7 ]
```

还是很方便的。

下面我们需要在 x 轴和 y 轴上写数字，来告诉我们这两个轴分别代表什么。 x 轴比较简单，只需要把每个数字在数组中的位置放上去就好，即 0、1、2、……

```javascript
g.append("g")
 .attr("transform", `translate(0, ${height})`)
 .call(d3.axisBottom(x));
```

同样的，`transform` 属性表示我们标记数字的位置，即从图形的顶部向下 `height` 距离，也就是我们图形的底部。y 轴稍麻烦些，我们不仅需要放上数字，还要加上说明来表示柱状图的具体含义，什么含义呢？我也不知道，就叫 “Some Secret Value” 好了

```javascript
g.append("g")
 .call(d3.axisLeft(y))
 .append("text")
 .attr("fill", "#000")
 .attr("transform", "rotate(-90)")
 .attr("y", 6)
 .attr("dy", "0.9em")
 .attr("text-anchor", "end")
 .text("Some Secret Value");
```

在这里可以看到在 `.call(d3.axisLeft(y))` 之后，又继续添加了一个 `text` 标签来显示 y 轴的含义，即 “Some Secret Value” 。

到此为止，打开 `index.html` 就可以看到一个漂亮的坐标轴

![](/images/blog/histogram-axis.png)

在添加数据之前，我期望每个柱子有这样一个效果，默认显示为蓝色，当鼠标移上去的时候会变成棕色，采用一点 css 技巧（当然是从别处借鉴来的）

```css
.bar {
  fill: steelblue;
}

.bar:hover {
  fill: brown;
}
```

然后利用上述 css 代码，开始绘制数据

```javascript
g.selectAll('.bar')
 .data(data)
 .enter()
 .append('rect')
 .attr('class', 'bar')
 .attr("x", (_, i) => x(i))
 .attr("y", (d) => y(d))
 .attr("width", x.bandwidth())
 .attr("height", (d) => height - y(d));
```

对这一小段，我的理解是，先选择下面将要出现的所有 `class="bar"` 的 DOM （对，它们还没有出现，但 D3 已经选定它们），通过 `.data(data).enter()` 将数据加载给这这 DOM 。 D3 要求这里的数据格式是一个数组，然后对于数据中的每一个元素，添加一个 `rect` 标签来表示当前这个元素，不消说， `class` 的值自然是 `bar` 。后面的 `x` 和 `y` 属性代表该柱的位置，这时就能体现 D3 的强大了，它们分别由数字在数组中的位置和数字本身的大小决定的，直接丢给之前定义好的 `x` 和 `y` （还记得 `[...Array(data.length).keys()]` 吗？我们就是用它指定了 x 轴的各个坐标），它们就能自动返回正确的结果。一个可能看起来比较奇怪的地方是高度 `height` ，为什么要用 `height - y(d)` ？因为浏览器对 y 轴方向的表示是反直觉的，越往下坐标值越大。 `y(d)` 本身是给的参数越大，返回值越小（初始化的时候 `height` 在前），同时我们设定的表示范围是 `[0, d3.max(data, (d) => d)]` ，所以可以猜到，当传入数组 `data` 中的最大值94时， `y(d)` 的返回值是0，所以要用高度减去该值，才是我们想要的高度。

## 合

先上结果

![](/images/blog/histogram-complete.png)

到此为止，我们就有了一个看起来还行的直方图，横轴是数字在数组中的坐标，纵轴是数字的值，完整的代码我放在了 [JSFiddle](https://jsfiddle.net/jsa7obxg/) 上。通过实现这么一个简单的例子，可以看出要想用好 D3.js ，首先要对 SVG 有一个非常深入的了解，需要熟悉每种图形的画法，组成方式等， D3.js 本身并不画图，而是通过包装对 DOM 的操作大大简化了画图的流程。当然，要想制作出富有表现力的图形，深厚的前端功力也是必不可少的。

## 2019/03/31 更新

经网友 [encro](https://www.v2ex.com/member/encro) 指出， D3 一般搭配着 [C3](https://c3js.org/) 使用，粗略看了一眼，似乎 C3 是一个基于 D3 的可复用的图表库，很多图表可以开箱即用，我们给它传数据即可。这样一个库确实十分解放生产力，在学习 D3 的时候就对各种图形、坐标等参数颇感头疼，数据很简单，但大量的时间被浪费在了这些细枝末节的地方，实际生产中，很需要 C3 这样的一个工具。
