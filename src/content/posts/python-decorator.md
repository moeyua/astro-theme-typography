---
title: 深入浅出 Python 装饰器
pubDate: 2019-05-06 22:47 PST
categories: ["聊聊技术"]
tags: Decorator, Python, 装饰器, 源码阅读
heroImage: /images/blog/decoration.jpg
heroImageDescription: Photo by Megan Hodges on Unsplash
---

## 问题

[上回书](https://old-panda.com/posts/python-context-manager)我们说到，当给一个生成器函数加上 `@context.contextmanager` 时，这个函数就可以用上下文管理器的语法（ `with` ）来调用，其中 `yield` 返回的变量即为我们在 `with` 区块中使用的值。我们已经知道，要用上下文管理器调用一个函数或者变量，该变量需要是一个实现了 `__enter__` 和 `__exit__` 方法的类的实例，那么不禁好奇，为什么加上 `@context.contextmanager` 之后，一个函数就能用作上下文管理器？

还是从 Python 源码入手，不难发现， [@context.contextmanager](https://github.com/python/cpython/blob/3.7/Lib/contextlib.py#L210) 实际上是一个普通的 Python 高阶函数，它返回的是一个定义在它里面的函数 [helper](https://github.com/python/cpython/blob/3.7/Lib/contextlib.py#L238) ，而 `helper` 返回的则是类 [_GeneratorContextManager](https://github.com/python/cpython/blob/3.7/Lib/contextlib.py#L96) 的实例。通过阅读 `_GeneratorContextManager` 的源码，可以看到这个类实现了 `__enter__` 和 `__exit__` 方法。可以猜想，每次调用带有 `@context.contextmanager` 的函数时，我们实质上调用的是 `_GeneratorContextManager` 的一个实例，所以我们才能用 `with` 关键字使之成为一个上下文管理器。因此引出了下一个问题， `@foobar` 究竟做了怎样的操作，就能把一个函数变成另一个东西？

## 理论

这种语法叫做装饰器，通过在函数之前加上这样一个 `@foobar` 的注解，使函数的行为发生变化，它本质上是一种语法糖，我们在上面也看到了，它其实是一个高阶函数，输入一个函数，返回另一个函数。为了更好的理解装饰器，我们还是从它的来源入手—— [PEP 318](https://www.python.org/dev/peps/pep-0318/) 。文档[摘要](https://www.python.org/dev/peps/pep-0318/#abstract)简单说明了装饰器出现的原因：因为之前我们想要定义一个类方法或者静态方法，需要写一堆很啰嗦的代码，难以理解，所以就需要这样一种东西，在函数/方法定义之处就能让其成为我们希望的样子。在 PEP 文档中还给出了简单的示例，比如说下面的这段代码

```python
@dec2
@dec1
def func(arg1, arg2, ...):
    pass
```

等价于

```python
def func(arg1, arg2, ...):
    pass
func = dec2(dec1(func))
```

所以这就要求了能用来作为装饰器的部分，即 `foobar` ，其本身为一个函数，它必须以一个函数为输入，同时返回一个函数，这个返回的函数必须能接受原来 `func` 的参数。类似的，如果想让装饰器 `foobar` 接受参数，下面的代码

```python
@decomaker(argA, argB, ...)
def func(arg1, arg2, ...):
    pass
```

就等价于

```python
func = decomaker(argA, argB, ...)(func)
```

同样， `decomaker(argA, argB, ...)` 也必须满足上述高阶函数的要求。

理解了原理，实现自己的装饰器就易如反掌了。

## 实践

首先实现一个不带参数的装饰器 `poem` ，它的效果是在被装饰的函数执行之前，输出两句诗。上面已经提到过， `poem` 函数接受一个函数作为参数，返回另一个函数，这个返回的函数需要接受被装饰函数的参数，同时能够返回被装饰函数的计算结果，我们在返回计算结果之前打印出诗句，即可完成需求。

按照上一段的描述简单实现一个

```python
def poem(func):
    def helper(*args, **kwargs):
        print("苟利国家生死以，岂因祸福避趋之")
        return func(*args, **kwargs)
    return helper
```

再跑两个函数试试看，一个不接受任何参数，返回字符串，另一个接受两个整数，返回它们的和，这样我们就成功实现了一个简单的装饰器。

```python
>>> @poem
... def hello():
...     return "Hello, world!"
...
>>> hello()
苟利国家生死以，岂因祸福避趋之
'Hello, world!'
>>> @poem
... def add(a, b):
...     return a + b
...
>>> add(1, 1)
苟利国家生死以，岂因祸福避趋之
2
>>> add(12, 13)
苟利国家生死以，岂因祸福避趋之
25
```

有时候我们还可能面临这样的需求，就是能不能通过装饰器定制输出的内容，即如何让装饰器接受一个参数。我们从已经实现的 `poem` 的基础上进行修改。

接受一个参数（多个参数的情况类似），装饰器语法就变成了 `@poem(input)` ，这要求 `poem(input)` 返回的函数是一个高阶函数，只不过 `helper` 函数中的打印语句就需要用我们传入的 。听起来很像是在上述的 `poem` 函数外面又包了一层函数，只接受 `input` 参数。实现的代码如下

```python
def poem(poem_str):
    def wrapper(func):
        def helper(*args, **kwargs):
            print(poem_str)
            return func(*args, **kwargs)
        return helper
    return wrapper
```

还是用 `hello` 和 `add` 两个函数来测试

```python
>>> @poem("苟利国家生死以，岂因祸福避趋之")
... def hello():
...     return "Hello, world!"
...
>>> hello()
苟利国家生死以，岂因祸福避趋之
'Hello, world!'
>>> @poem("遥望天都倚客松，莲花始信两飞峰。且持梦笔书奇景，日破云涛万里红。")
... def add(a, b):
...     return a + b
...
>>> add(1, 2)
遥望天都倚客松，莲花始信两飞峰。且持梦笔书奇景，日破云涛万里红。
3
```

最后，让我们回到 `@context.contextmanager` ，它返回了一个 `helper` 函数，而 `helper` 返回了 `_GeneratorContextManager` 实例，说明我们的猜想是正确的，当一个函数被 `@context.contextmanager` 装饰之后，它就不再是一个原来那个函数了，而是一个实现了上下文管理器的实例，不难验证

```python
>>> from contextlib import contextmanager
>>> @contextmanager
... def foo(bar):
...     yield bar
...     print("苟利国家生死以，岂因祸福避趋之")
...
>>> foo("naive")
<contextlib._GeneratorContextManager object at 0x105148588>
```
