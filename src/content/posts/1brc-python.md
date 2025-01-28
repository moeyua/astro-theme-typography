---
title: 用 Python 试玩十亿行挑战
pubDate: 2024-08-25 18:54 PST
categories: ["聊聊技术"]
tags: Python, 1brc, 十亿行挑战, The One Billion Row Challenge
heroImage: /images/blog/1-Billion-Row-Challenge.jpg
---

最近用 Python 玩了一下[十亿行挑战](https://www.morling.dev/blog/one-billion-row-challenge/)，并在本地环境上将用时从将近八分钟优化到半分钟出头，在这期间了解了很多以前不知道的 Python 技巧，所以记录下来方便后续参考。

# 什么是十亿行挑战？

这是一个由 [Gunnar Morling](https://www.morling.dev/) 发起的挑战，不过仅限于 Java 圈：编写一段 Java 程序在最短的时间内处理一个有十亿行的文件，其中每一行包含了一个观测站和对应的气温，前者是字符串类型，后者为浮点数，两者之间由分号间隔，就像下面的片段所示，

```
» head -n 10 measurements.txt
Thessaloniki;20.4
Malé;23.3
Rostov-on-Don;10.1
Heraklion;18.4
Alice Springs;2.7
Port Sudan;32.1
Port-Gentil;33.0
Napier;15.2
Sapporo;3.5
Malé;29.0
```

程序的输出为每个观测站的最低温，平均温度，和最高温，按观测站的名称排序，

```
{Abha=5.0/18.0/27.4, Abidjan=15.7/26.0/34.1, Abéché=12.1/29.4/35.6, Accra=14.7/26.4/33.1, Addis Ababa=2.1/16.0/24.3, Adelaide=4.1/17.3/29.7, ...}
```

后来这项挑战火出了圈，也有了一个专门的[网站](https://1brc.dev/)欢迎人们提交各种语言的版本。最近我用 Python 比较多，所以就用 Python 来玩一玩。

# 环境

- CPU — Apple M2 Max
- 内存 — 32 GB
- 操作系统 — macOS Sonoma
- Python — 3.12.5

# 版本 1.0

这项任务不需要考虑复杂的算法，唯一的难点在于输入的数据大小，十亿行大约是 13 GB 左右，得出正确的计算结果很容易，但计算地有效率很难。我们很快就能实现一个简单的版本并给出正确的输出，

```python
from dataclasses import dataclass
from typing import Dict


@dataclass
class Temperature:
    min_temp: float
    max_temp: float
    sum_temp: float
    count: int


def process_file():
    temperatures: Dict[str, Temperature] = dict()
    with open("measurements.txt") as f:
        for line in f:
            station, temp_str = line.split(";")
            t = temperatures.get(station)
            temperature = float(temp_str)
            if not t:
                temperatures[station] = Temperature(
                    temperature, temperature, temperature, 1
                )
            else:
                t.min_temp = min(t.min_temp, temperature)
                t.max_temp = max(t.max_temp, temperature)
                t.sum_temp += temperature
                t.count += 1

    with open("panda.txt", "w") as out_f:
        out_f.write("{")
        for station, t in sorted(temperatures.items()):
            out_f.write(
                f"{station}={t.min_temp:.1f}/{t.sum_temp / t.count:.1f}/{t.max_temp:.1f}, ",
            )
        out_f.write("\b\b} \n")


if __name__ == "__main__":
    process_file()
```

耗时如下

```
463.26s user 2.63s system 99% cpu 7:49.20 total
```

在一个 CPU 跑满的情况下用了将近八分钟才结束，我们将在此基础上进行优化。

# 优化

整个代码总共做了三件事，

1. 读文件
2. 按 1brc 的说明处理数据
3. 写文件

在最终的结果中，所有观测站的数量只有几百个，因此在最后一步写文件上下工夫是没有必要的，需要优化的地方主要集中在前两步，一个是如何有效率地读文件，一个是如何在处理数据时有效地利用多核。

## 读文件耗时分析

我们先来看一看在版本 1.0 中按行读文件的方法究竟需要花费多久，把读文件的代码抽取出来只有三行，

```python
with open("measurements.txt") as f:
    for _ in f:
        pass
```

耗时

```
56.77s user 2.16s system 99% cpu 58.985 total
```

只是简单过一遍文件就需要差不多一分钟，这个 I/O 开销实在是太大了，这一部分毫无疑问存在优化的空间。

经常与文件打交道的话可以知道一次读取多个字节的数据通常比按行遍历要快，但需要改一下代码找出最合适的数据块大小，

```python
import time

chunk_sizes = []
for i in range(10, 31):
    chunk_sizes.append(2**i)

for chunk_size in chunk_sizes:
    start = time.time()

    def read_file():
        with open("measurements.txt", mode="r") as f:
            while True:
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                yield chunk

    for _ in read_file():
        pass

    print(f"CHUNK SIZE: {chunk_size: >10}, ELAPSED TIME: {time.time() - start}")
```

运行结果为

```
CHUNK SIZE:       1024, ELAPSED TIME: 4.204729080200195
CHUNK SIZE:       2048, ELAPSED TIME: 3.5845539569854736
CHUNK SIZE:       4096, ELAPSED TIME: 3.1715991497039795
CHUNK SIZE:       8192, ELAPSED TIME: 2.072834014892578
CHUNK SIZE:      16384, ELAPSED TIME: 1.478424072265625
CHUNK SIZE:      32768, ELAPSED TIME: 1.1602458953857422
CHUNK SIZE:      65536, ELAPSED TIME: 1.0105319023132324
CHUNK SIZE:     131072, ELAPSED TIME: 0.9584476947784424
CHUNK SIZE:     262144, ELAPSED TIME: 0.9280698299407959
CHUNK SIZE:     524288, ELAPSED TIME: 0.9165401458740234
CHUNK SIZE:    1048576, ELAPSED TIME: 0.8949398994445801
CHUNK SIZE:    2097152, ELAPSED TIME: 1.367276906967163
CHUNK SIZE:    4194304, ELAPSED TIME: 1.3553977012634277
CHUNK SIZE:    8388608, ELAPSED TIME: 0.9136021137237549
CHUNK SIZE:   16777216, ELAPSED TIME: 1.400062084197998
CHUNK SIZE:   33554432, ELAPSED TIME: 1.4531581401824951
CHUNK SIZE:   67108864, ELAPSED TIME: 1.6019279956817627
CHUNK SIZE:  134217728, ELAPSED TIME: 1.5939080715179443
CHUNK SIZE:  268435456, ELAPSED TIME: 1.6016528606414795
CHUNK SIZE:  536870912, ELAPSED TIME: 1.8202641010284424
CHUNK SIZE: 1073741824, ELAPSED TIME: 2.6885197162628174
```

直接取最小值 1048576 作为数据块的大小。但这样读出来的每一块结尾未必对应着行尾，所以简单粗暴截出来的数据块送给下游代码去处理的话会出现同一行的内容不完整的情况，因此需要稍微修改一下读文件的代码：在每次读完之后需要检查末尾是否为 `\n` ，若不是的话继续按字节读取，直到第一个行尾。对应的读文件代码为

```python
def read_chunks(filename: str) -> Generator[str, None, None]:
    CHUNK_SIZE = 1048576
    with open("measurements.txt", mode="r") as f:
        while True:
            chunk = f.read(CHUNK_SIZE)
            if not chunk:
                break
            while chunk[-1] != "\n":
                chunk += f.read(1)
            yield chunk

for _ in read_file("measurements.txt"):
    pass
```

耗时

```
4.37s user 3.49s system 99% cpu 7.870 total
```

可以看到比按行读取大大降低了用时。

到这里还远远不是结束，还可以继续优化，据 [Python 官方文档](https://docs.python.org/3/library/functions.html#open)所言，以二进制模式读文件时可以省去将字节解码为字符串的开销，

> As mentioned in the [Overview](https://docs.python.org/3/library/io.html#io-overview), Python distinguishes between binary and text I/O. Files opened in binary mode (including 'b' in the _mode_ argument) return contents as [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) objects without any decoding.

因此将文件的打开模式改为 `mode="rb”` ，对应的代码为

```python
def read_chunks(filename: str) -> Generator[bytes, None, None]:
    CHUNK_SIZE = 1048576
    with open(filename, mode="rb") as f:
        while True:
            chunk = f.read(CHUNK_SIZE)
            if not chunk:
                break
            while chunk[-1] != 10:
                chunk += f.read(1)
            yield chunk


for _ in read_file("measurements.txt"):
    pass
```

耗时

```
1.91s user 0.97s system 99% cpu 2.885 total
```

这样读文件的优化就可以告一段落了。

## 多进程

下一步考虑的是如何把上面读出来的文件块分解成行，并把每一行的数据解析汇总得到最终想要的结果。

机器总共有 12 个核，那么只有一个干活，剩下的十一个围观就是极大的浪费，并且在上面的分析中整个文件已经被切成了若干块，非常适合用多进程并行处理。为什么不考虑多线程呢？请参考 [Python 的 GIL](https://docs.python.org/3/glossary.html#term-global-interpreter-lock) 这一段，简单来说由于 Python 在最初设计时的问题，在运行 CPU 密集型任务时在同一个时刻只有一个线程可以获得全局解释锁，其他线程都被挂起，直到正在运行的线程退出。分析聚合每一行的数据明显要吃掉大量 CPU 资源，这个时候开一堆线程去抢唯一的一把锁无疑会浪费大量的资源，最终的程序性能反而不一定比最初的单核版本好。

应用多进程之前，数据块处理中的一段代码需要优化，

```python
...
t.min_temp = min(t.min_temp, temperature)
t.max_temp = max(t.max_temp, temperature)
...
```

在上面的实现中，无论比较结果如何，都需要对 `t.min_temp` 和 `t.max_temp` 进行一次赋值，其实这是没必要的，可以改成

```python
...
if temperature < t.min_temp:
    t.min_temp = temperature
if temperature > t.max_temp:
    t.max_temp = temperature
...
```

这样处理每个数据块的函数可以写作

```python
def process_chunk(chunk: bytes) -> Dict[bytes, Temperature]:
    temp_result: Dict[bytes, Temperature] = dict()
    for line in chunk.splitlines():
        station, temp_str = line.split(b";")
        temperature = float(temp_str)
        t = temp_result.get(station)
        if not t:
            temp_result[station] = Temperature(temperature, temperature, temperature, 1)
        else:
            if temperature < t.min_temp:
                t.min_temp = temperature
            if temperature > t.max_temp:
                t.max_temp = temperature
            t.sum_temp += temperature
            t.count += 1
    return temp_result
```

Python 自带的进程池允许我们直接把函数映射到一个迭代器上，在这里就是 `read_chunks` 函数返回的生成器

```python
def map_job(filename: str) -> Iterator[Dict[bytes, Temperature]]:
    with concurrent.futures.ProcessPoolExecutor(max_workers=os.cpu_count()) as pool:
        return pool.map(process_chunk, read_chunks(filename))
```

最后需要用一个 reduce job 来集合 map job 产生的临时结果，整理后的完整代码如下所示

```python
import concurrent.futures
import os

from dataclasses import dataclass
from typing import Dict, Generator, Iterator


@dataclass
class Temperature:
    min_temp: float
    max_temp: float
    sum_temp: float
    count: int


def read_chunks(filename: str) -> Generator[bytes, None, None]:
    CHUNK_SIZE = 1048576
    with open(filename, mode="rb") as f:
        while True:
            chunk = f.read(CHUNK_SIZE)
            if not chunk:
                break
            while chunk[-1] != 10:
                chunk += f.read(1)
            yield chunk


def process_chunk(chunk: bytes) -> Dict[bytes, Temperature]:
    temp_result: Dict[bytes, Temperature] = dict()
    for line in chunk.splitlines():
        station, temp_str = line.split(b";")
        temperature = float(temp_str)
        t = temp_result.get(station)
        if t is None:
            temp_result[station] = Temperature(temperature, temperature, temperature, 1)
        else:
            if temperature < t.min_temp:
                t.min_temp = temperature
            elif temperature > t.max_temp:
                t.max_temp = temperature
            t.sum_temp += temperature
            t.count += 1
    return temp_result


def map_job(filename: str) -> Iterator[Dict[bytes, Temperature]]:
    with concurrent.futures.ProcessPoolExecutor(max_workers=os.cpu_count()) as pool:
        return pool.map(process_chunk, read_chunks(filename))


def reduce_job(
    temp_results: Iterator[Dict[bytes, Temperature]]
) -> Dict[bytes, Temperature]:
    result: Dict[bytes, Temperature] = dict()
    for item in temp_results:
        for station, temperature in item.items():
            t = result.get(station)
            if t is None:
                result[station] = temperature
            else:
                if temperature.min_temp < t.min_temp:
                    t.min_temp = temperature.min_temp
                elif temperature.max_temp > t.max_temp:
                    t.max_temp = temperature.max_temp
                t.sum_temp += temperature.sum_temp
                t.count += temperature.count
    return result


def write_file(result: Dict[bytes, Temperature], output_file: str):
    with open(output_file, "w") as out_f:
        out_f.write("{")
        for station, t in sorted(result.items()):
            out_f.write(f"{station.decode("utf-8")}={t.min_temp:.1f}/{t.sum_temp / t.count:.1f}/{t.max_temp:.1f}, ")
        out_f.write("\b\b} \n")

if __name__ == "__main__":
    input_file = "measurements.txt"
    temp_results = map_job(input_file)
    result = reduce_job(temp_results)

    output_file = "panda.txt"
    write_file(result, output_file)
```

耗时

```
301.05s user 21.41s system 961% cpu 33.548 total
```

与其他语言相比这个结果不怎么样，不过能把向来以慢著称的 Python 优化到这个程度大概也算可以了。

# 参考资料

- [1 Billion Row Challenge (1brc.dev)](https://1brc.dev/)
- [Glossary — Python 3.12.5 documentation](https://docs.python.org/3/glossary.html#term-global-interpreter-lock)
- [concurrent.futures — Launching parallel tasks — Python 3.12.5 documentation](https://docs.python.org/3/library/concurrent.futures.html#processpoolexecutor)
- [Built-in Functions — Python 3.12.5 documentation](https://docs.python.org/3/library/functions.html#open)
