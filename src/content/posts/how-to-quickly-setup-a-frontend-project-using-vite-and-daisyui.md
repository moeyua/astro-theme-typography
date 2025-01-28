---
title: 用 Vite + DaisyUI 快速搭建前端工程
pubDate: 2023-02-12 14:36 PST
categories: ["聊聊技术"]
tags: daisyUI, Tailwind CSS, TypeScript, Vite, Vue.js
heroImage: /images/blog/og-image-announcing-vite3.png
heroImageDescription: "Credit: https://vitejs.dev/blog/announcing-vite3.html"
---

> 我今天写的这篇文章，就是用来呼应两天前发布的这个[项目](https://green-tiles.vercel.app/)的

上个月是我第一次用前端框架写项目，众所周知，前端领域百花齐放，各种框架工具命令行满天飞，虽然本质上都是 JavaScript ，但互不兼容。想去 GitHub 上学习别人的优秀项目，但往往被项目中庞大的文件数量劝退，看起来有很多像是自动生成的文件，但又不敢确定， Readme 中只提到如何编译运行，却不会详细说明这个项目是如何从零开始创建的（可能前端工程师们觉得这些太小儿科了），因此摸索的过程占据了大部分时间，真正的功能实现反而是项目中最简单的一块。作为第一次接触前端项目开发的初学者，我觉得还是有必要简单记录一下自己用 [Vite](https://vitejs.dev/) 和 [DaisyUI](https://daisyui.com/) 搭建项目框架的整个过程，虽然内容看起来非常初级，但对于一名前端新手来说却是必要的。

阅读本篇之前，请确保本地已经安装了 [pnpm](https://pnpm.io/) 。

## 用 Vite 初始化项目

根据官网的教程，在想要创建项目的路径下执行

```shell
pnpm create vite
```

接下来它会弹出一系列选择项，可以根据自己的实际情况选择填写，在这里我把项目命名为 `my-vite-project` ，框架使用 [Vue.js](https://vuejs.org/) ，编程语言选择 [TypeScript](https://www.typescriptlang.org/) 。

```shell
✔ Project name: … my-vite-project
✔ Select a framework: › Vue
✔ Select a variant: › TypeScript
```

接着进入新建的项目，安装依赖并执行

```shell
cd my-vite-project
pnpm install
pnpm run dev
```

在浏览器中打开 `http://localhost:5174/` （如果你没有去 `vite.config.ts` 改端口的话），将会看到这样的页面

<figure>

![](/images/blog/localhost_5174_-1024x754.png)

<figcaption>

Vite 默认页面

</figcaption>

</figure>

说明项目创建成功，下面可以开始安装 UI 库 DaisyUI 了。

## 安装 UI 库

DaisyUI 基于 [Tailwind CSS](https://tailwindcss.com/) 开发，所以首先需要安装 Tailwind CSS 。

虽然 Tailwind CSS 提供了非常强大的用户交互界面组件，但对于我这样的新手来说过于繁杂，我所希望使用的只是简单的几个组件，有文本，有输入框，有按钮就足够了， DaisyUI 恰好满足了我的需求，又足够简单，文档清晰明了，示例代码可以拿来即用。

安装之前，先暂停在上一步运行的进程。

### 安装 Tailwind CSS

同样根据[官网](https://tailwindcss.com/docs/guides/vite#vue)教程，

```shell
pnpm install -D tailwindcss postcss autoprefixer
pnpx tailwindcss init -p
```

然后编辑上一步生成的 `tailwind.config.cjs` 文件，结果如下

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

再把 Tailwind CSS 相关的内容添加到文件 `./src/style.css` 中。在这个项目中我准备直接使用 Tailwind CSS 提供的组件，并不打算自己编写 css 代码（其实是不会写），因此文件中原有的内容可以全部删掉，只保留下面三行。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 安装 DaisyUI

安装 DaisyUI 就非常简单了，[官网](https://daisyui.com/docs/install/)上只有两步，为了阅读本文时不需要在各个页面之间来回跳转，我在这里复述一遍。

首先安装依赖本身，

```shell
pnpm install daisyui
```

然后在 Tailwind CSS 的配置文件 `tailwind.config.cjs` 中声明使用 DaisyUI 。

```javascript
module.exports = {
  //...
  plugins: [require("daisyui")],
}
```

至此，所有的前置准备步骤已经完成。

## 验证

重新运行项目

```shell
pnpm run dev
```

这样我们在文件中的每个修改都可是实时地反映到页面上。

下面从 DaisyUI 官网上拿一些组件过来试试，编辑文件 `./src/App.vue` ，

```vue
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>
<template>
  <HelloWorld msg="Hello world!" />
</template>
```

然后编辑 HelloWorld 组件文件 `./src/components/HelloWorld.vue` ，添加 [Card](https://daisyui.com/components/card/) 组件，并稍加修改，

```vue
<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ msg: string }>()
const count = ref(0)
</script>
<template>
  <div class="card w-1/3 bg-base-100 shadow-xl">
    <figure><img src="https://evercam.com/wp-content/uploads/sites/11/2019/11/big-red-button.jpg" alt="Red Button"
        @click="count++" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ msg }}</h2>
      <p>This is a magic button showing how many clicks on it</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="count++">count is {{ count }}</button>
      </div>
    </div>
  </div>
</template>
```

回到地址 `http://localhost:5174/` ，不出意外应该可以看到一个大大的按钮图片，下方配有简单的文字，每点一次按钮，数字就会加一。

<figure>

![](/images/blog/vite-daisyui-image.png)

<figcaption>

Card Demo

</figcaption>

</figure>

大功告成！可以开始编写自己的业务代码了。

本文完整的代码已经上传到 [GitHub](https://github.com/OldPanda/my-vite-project) ，欢迎交流！

## 参考资料

- [Vite 官网](https://vitejs.dev/)

- [Tailwind CSS 官网](https://tailwindcss.com/)

- [Daisy UI 官网](https://daisyui.com/)
