---
title: 不用 Python 自带的 Dict 实现自己的 HashTable
pubDate: 2018-12-09 23:00 PST
categories: ["聊聊技术"]
tags: Dict, HashTable, Python, Uber, 哈希表, 面经
heroImage: /images/blog/python-programming.jpg
heroImageDescription: Photo by Chris Ried on Unsplash
---

这个题目其实源于很久之前的一次 Uber 面试，码工换工作无非就是刷 [leetcode](https://leetcode.com/) ，研究如何翻转二叉树之类的算法问题，所以头一次在电话里听到这道题的时候还是挺耳目一新的。当时顺利写出来了，也通过了电面，但觉得还是有不完善的地方，比如说代码不够 “Python” 等，所以趁着周天晚上闲着无事，又拿出来写了写。

[HashTable](https://en.wikipedia.org/wiki/Hash_table) 本身大家应该都很熟悉了，中文叫”哈希表“或者”散列表“，具体翻译看教材编写者的个人喜好。众所周知这个数据结构用来存储”键-值“结构的数据，可以做到常数级时间复杂度的查找，在日常搬砖中算是主力工具。实现一个 HashTable 其实就是实现两个部分

- Hash 函数。这个函数能够读入一个[可被 hash 的变量](https://stackoverflow.com/a/14535739/2191173)，输出一个整数。在本次实现中暂不考虑这一块，用 Python 自带的 [hash 函数](https://docs.python.org/3/library/functions.html#hash)偷个懒

- Hash 冲突的解决机制。成熟的方法有[很多种](https://en.wikipedia.org/wiki/Hash_table#Collision_resolution)，在这里只考虑最简单的一种，即将同一个 hash 值下的不同的 key 存放在数组的同一个位置，以链表形式保存

既然是自己实现，就根据 HashTable 的查找原理选择 List 作为数据存储结构，在每个位置放置一个子 List 用于解决 hash 冲突，因此对于构造函数来说，大概应该长这个样子

```python
class MyDict(object):
    def __init__(self, size=99999):
        self.hash_list = [list() for _ in range(size)]
        self.size = size
```

每次添加一个键值对时，将 key hash 后的整数对 List 长度取模，即得到该 key 在 List 中的位置。因为 List 的每个位置是一个子 List ，所以需要遍历该子 List ，如果已存在该键值对，则更新 value ；如果不存在，将该键值对存在尾部。

```python
def __setitem__(self, key, value):
    hashed_key = hash(key) % self.size
    for item in self.hash_list[hashed_key]:
        if item[0] == key:
            item[1] = value
            break
    else:
        self.hash_list[hashed_key].append([key, value])
```

同理，在 `MyDict` 类中取值时，首先定位到给定 key 的位置，然后遍历其中的子 List ，若存在，返回 value；若不存在，抛出 `KeyError`。

```python
def __getitem__(self, key):
    for item in self.hash_list[hash(key) % self.size]:
        if item[0] == key:
            return item[1]
    raise KeyError(key)
```

这样一个简单的字典类（HashTable）就写好了，没有太多的功能，仅仅支持存放键值对及取值，运行效率也不算高，但已经够用了，函数的时间复杂度也是 O(1) 级别的。在这里用 Python 的[魔术方法](https://www.python-course.eu/python3_magic_methods.php)实现了这两个函数，这样就能像操作 Python 自带的 `Dict` 那样来操作 `MyDict` 。简单的示例如下。

```python
>>> from my_dict import MyDict
>>> d = MyDict()
>>> d["a"] = 1
>>> d["b"] = 2
>>> d["c"] = 3
>>> d["a"]
1
>>> d["d"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/path/to/my_dict.py", line 19, in __getitem__
    raise KeyError(key)
KeyError: 'd'
```

至此 `MyDict` 的实现还不算结束，因为还不能判断一个 key 是否在字典中，无法遍历字典等，这一部分补完在[下一篇文章](https://old-panda.com/posts/python-magic-methods)中。
