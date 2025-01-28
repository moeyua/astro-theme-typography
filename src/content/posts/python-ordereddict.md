---
title: OrderedDict 是如何保证 Key 的插入顺序的
pubDate: 2020-02-09 14:28 PST
categories: ["聊聊技术"]
tags: OrderedDict, Python, 源码阅读
heroImage: /images/blog/ordered-letters-scaled.jpg
heroImageDescription: Photo by Diomari Madulara on Unsplash
---

## 现象

根据[哈希表](https://zh.wikipedia.org/zh/%E5%93%88%E5%B8%8C%E8%A1%A8)的定义，以及之前简单实现过的一个[字典数据结构](https://old-panda.com/posts/my-python-dict/)，当 Key 被插入哈希表后，哈希表根据散列函数求出的值来安排这个 Key 所在的位置，所以当我们遍历哈希表的时候， Key 的顺序是不确定的，因此码农在使用哈希表这个数据结构的时候，是不应该依赖于 Key 的插入顺序来达到某些目的的。

但有的时候我们可能会对哈希表中 Key 的插入顺序感兴趣，这时有经验的 Python 工程师就会用 `collections` 中的 `OrderedDict` 来保持插入 Key 的顺序。

```python
>>> d1 = {}
>>> d1['a'] = 1
>>> d1['b'] = 2
>>> d1['c'] = 3
>>> d1['d'] = 4
>>> d1['e'] = 5
>>> d1
{'b': 2, 'd': 4, 'c': 3, 'a': 1, 'e': 5}
>>> from collections import OrderedDict
>>> d2 = OrderedDict()
>>> d2['a'] = 1
>>> d2['b'] = 2
>>> d2['c'] = 3
>>> d2['d'] = 4
>>> d2['e'] = 5
>>> d2
OrderedDict([('a', 1), ('b', 2), ('c', 3), ('d', 4), ('e', 5)])
>>>
```

`d1` 是一个普通的字典实例，我们按照 abcde 的顺序插入 Key 之后，打印 d1 显示的是乱序的，这符合我们对哈希表的理解， `d2` 是一个 `OrderedDict` 实例，同样按 abcde 的顺序插入，从输出结果我们能看到它记忆了插入的顺序。那么问题来了，它是如何做到的？

## 原理

还是去源码中一探究竟，找到 Python 3 的 [OrderedDict 实现](https://github.com/python/cpython/blob/3.8/Lib/collections/__init__.py#L81)，不难发现，在继承 了自身的 dict 之后，类中还声明了一个[循环双向链表 `self.__root`](https://github.com/python/cpython/blob/3.8/Lib/collections/__init__.py#L103-L105) 作为自己的属性，用另一个 [dict 结构 `self.__map`](https://github.com/python/cpython/blob/3.8/Lib/collections/__init__.py#L106) 来存储 Key 到链表节点的对应关系，这样在更新或删除一个已有 Key 的时候，能在常数时间内完成对双向链表的操作。这几个数据结构的关系如下所示，注意 `self.__root` 总是指向双向链表的头部。

<iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://www.lucidchart.com/documents/embeddedchart/7a6fa2bc-e1d1-4abd-9cae-5400fc885cbd" id="PCbwFSCvwfcu"></iframe>

这样在遍历 `OrderedDict` 的时候，直接过一遍循环双向链表即可。

但类变得复杂了，相应的操作也会复杂起来，但上述的两种数据结构的结合，仍然能够做到对字典示例常数级操作。查询（ `__getitem__` ）操作比较直观，可以通过调用父类的函数来完成。下面重点记录插入和删除操作是如何进行的。

#### 插入

插入操作调用魔术方法 `__setitem__` ，当 Key 存在时，直接调用父类函数，复杂的情况是当 Key 不存在的时候，不仅需要把键值对放到哈希表中，还要同步更新 `self.__map` 和 `self.__root` 。

1. 初始化新 Key 的链表节点

3. 找到双向链表的尾端，因为是循环链表，所以可以直接通过 `self.__root.prev` 得到

5. 将新的链表节点放到双向链表的尾端

7. 调用父类的插入函数处理新的键值对

#### 删除

删除操作调用 `__delitem__`

1. 调用父类的删除函数删掉给定的 Key

3. 通过 `self.__map` 定位到将要删除的 Key 对应的链表节点

5. 从链表中将这个节点删除

显然，关于有顺序的哈希表，核心是对循环双向链表的操作，而链表的插入删除都是常数级操作，又用了一个 `dict` 来保证查询的常数级操作，所以既能记录 Key 插入的顺序，又能保证操作的时间复杂度。

## 但是。。。

在 [Python 3.7](https://www.python.org/downloads/release/python-370/) 的发布中，官宣了 Python 原生的 `dict` 就能保证 Key 的插入顺序。

> The insertion-order preservation nature of dict objects is now an official part of the Python language spec.

这是否就意味着 `OrderedDict` 变得多余了呢？ StackOverflow 上有个[讨论](https://stackoverflow.com/a/50872567)列出了 Python 3.7 中原生 `dict` 与 `OrderedDict` 的区别，主要有两条。

- OrderedDict 支持对 Key 的顺序有关的操作，比如说把某个 Key 挪到头部或者尾部，逆序给出 Key 的序列（这个特性在 Python 3.8 中加到了原生 `dict` 中）等

- OrderedDict 比较的时候会把 Key 的插入顺序考虑进去，而 dict 不会，比如说

```python
>>> from collections import OrderedDict
>>> OrderedDict([(1,1), (2,2)]) == OrderedDict([(2,2), (1,1)])
False
>>> dict([(1,1), (2,2)]) == dict([(2,2), (1,1)])
True
```
