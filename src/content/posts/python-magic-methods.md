---
title: Python 的魔术方法
pubDate: 2018-12-16 23:05 PST
categories: ["聊聊技术"]
tags: Dict, Python, Magic methods
heroImage: /images/blog/magic-harry-potter.jpg
heroImageDescription: Photo by Sarah Ehlers on Unsplash
---

在[上一篇文章](https://old-panda.com/posts/my-python-dict)中实现了一个非常简陋的 `MyDict` 类，仅仅可以 `get` 、`set` ，其他的各种功能都没有，甚至连在 Python shell 中正常的表示都做不到。这篇文章将会继续完善这个字典类，并同时简单介绍用到的 Python 魔术方法。

目前的 `MyDict` 已经有了基本的功能，但如果试图输出，就会出现如下所示的样子。

```python
>>> from my_dict import MyDict
>>> d = MyDict()
>>> d["a"] = 1
>>> d["b"] = 2
>>> d["c"] = 3
>>> d
<my_dict.MyDict object at 0x1028fde48>
>>> print(d)
<my_dict.MyDict object at 0x1028fde48>
```

这时候，我们需要实现 Python 类中的 [\_\_repr\_\_](https://docs.python.org/3/reference/datamodel.html#object.__repr__) 和 [\_\_str\_\_](https://docs.python.org/3/reference/datamodel.html#object.__str__) 方法。关于两者的区别，[这里](https://stackoverflow.com/a/1438297/2191173)有个简洁明了的一句话解释

> My rule of thumb: `__repr__` is for developers, `__str__` is for customers.

在我们这里，单独在 shell 中执行一个 `d` ，解释器调用的是 `__repr__` ，用 `print` 函数输出时，调用的是 `__str__` 。同时，对于 `dict` ，这两个方法的输出是一致的，所以我们只需要实现一个 `__repr__` ，这个方法在 `__str__` 缺失时会替代其被调用。

```python
def __repr__(self):
    result = []
    for sub_list in self.hash_list:
        if not sub_list:
            continue
        for item in sub_list:
            result.append(str(item[0]) + ": " + str(item[1]))
    return "{" + ", ".join(result) + "}"
```

让我们继续尝试完善这个 `MyDict` 类。对于一个字典，除了以常数级的时间复杂度从中取值，我们经常做的另一个常数级操作是检查一个 `key` 是否在字典中，语法已经很熟悉了， `key in dict` 。实现 `in` 关键字的操作，需要在类中实现 [\_\_contains\_\_](https://docs.python.org/3/reference/datamodel.html#object.__contains__) 方法

```python
def __contains__(self, key):
    for item in self.hash_list[hash(key) % self.size]:
        if item[0] == key:
            return True
    return False
```

很多时候，我们希望能够遍历一个字典，通过调用 `.keys()` 、 `.values()` 、 `.items()` 来分别遍历键、值、键值对，这就要求 `MyDict` 的内部结构是可迭代的，所幸之前简单粗暴的采用了 `list` 来存储数据，但这还不够，因为我们在遍历字典的时候并不希望把内部 `list` 中的空位也返回给调用者。这个时候我们需要首先实现一个迭代器，将 `MyDict` 中的键值对依次返回，然后用这个迭代器实现 [__iter__](https://docs.python.org/3/reference/datamodel.html#object.__iter__) 方法，让其仅仅返回 `key` ，这样就可以有一个比较符合直觉的 `for key in my_dict` 调用，至于本段开始提到的三个方法，则可以调用这个迭代器或者 `__iter__` 来实现

```python
def __iterate_kv(self):
    for sub_list in self.hash_list:
        if not sub_list:
            continue
        for item in sub_list:
            yield item
def __iter__(self):
    for kv_pair in self.__iterate_kv():
        yield kv_pair[0]
def keys(self):
    return self.__iter__()
def values(self):
    for kv_pair in self.__iterate_kv():
        yield kv_pair[1]
def items(self):
    return self.__iterate_kv()
```

我们还期望得知目前字典的大小，即调用 `len(dict)` 就可以很方便的返回字典里有多少个键值对，这就需要实现 [__len__](https://docs.python.org/3/reference/datamodel.html#object.__len__) 方法。但每次调用这个方法时，从内部的 `list` 中一个个的去数有多少个键值对无疑是低效的，我们可以用一个变量来记录下当前的字典大小，每次新增一个键值对时自增，这样在调用 `len` 函数的时候就可以直接返回了。

```python
class MyDict(object):
    def __init__(self, size=99999):
        ...
        self.length = 0
    def __setitem__(self, key, value):
        ...
        for item in self.hash_list[hashed_key]:
            ...
        else:
            self.hash_list[hashed_key].append([key, value])
            self.length += 1
    ...
    def __len__(self):
        return self.length
```

到此为止， `MyDict` 的运行效果如下所示。完整版代码已经放到了 [gist 上](https://gist.github.com/OldPanda/af88b658837b5f8a242ac2cfa618f8a1)。

```python
>>> from my_dict import MyDict
>>> d = MyDict()
>>> d["a"] = 1
>>> d["b"] = 2
>>> d["c"] = 3
>>> d
{c: 3, a: 1, b: 2}
>>> print(d)
{c: 3, a: 1, b: 2}
>>> "a" in d
True
>>> "no-exist" in d
False
>>> for k in d:
...     print(k)
...
c
a
b
>>> for k in d.keys():
...     print(k)
...
c
a
b
>>> for v in d.values():
...     print(v)
...
3
1
2
>>> for k, v in d.items():
...     print(k, v)
...
c 3
a 1
b 2
>>> len(d)
3
```
