---
title: 记一次 Airflow 性能调优
pubDate: 2021-06-30 23:00 PST
categories: ["聊聊技术"]
tags: Apache Airflow, Google Cloud Composer
heroImage: /images/blog/airflow-logo-cropped.png
---

本文基于运行在 [Google Cloud Composer](https://cloud.google.com/composer/) 上的 [Airflow 1.10.15](https://airflow.apache.org/docs/apache-airflow/1.10.15/) 。

# TL;DR

复制一份[参数计算表格](https://docs.google.com/spreadsheets/d/1z5m8yO67BqKpuxoIGxgKjqqKWyJ34U1dEdCBWHV7pTM/edit#gid=0)，填入 Airflow 集群的配置，将最下方给出的参数结果应用到自己的集群上，稍等片刻即可生效。

# 问题产生

Airflow 用得久了，上面跑的 DAG 越来越多，并且随着业务量增加，每个 DAG 中需要执行的任务数量也越来越大，这时很容易遇到任务节点之间延迟过大的问题，具体表现为在上游节点执行完成之后，要等很久它的直接下游节点才会被 scheduler 安排到队列里等待执行。在我们的生产环境中，根据甘特图显示，最严重的时候两个相邻节点的执行需要等待 40 分钟之久，而任务的本身运行时间仅仅需要五六分钟左右，这样的性能对于数据离线分析来说是不可接受的，因此花了两天的工夫进行性能调优，借鉴了大量文档和前人经验。为了避免再次掉坑里，就决定写篇短文来记录一下这次调优的过程。

# 寻求答案

一般来说，任务执行间隔过久表明问题是出在 scheduler 上，一个很直觉的念头就是去官方文档看看有没有相关的说明，果然在常见问题列表中发现了[这个问题](https://airflow.apache.org/docs/apache-airflow/1.10.15/faq.html#how-to-reduce-airflow-dag-scheduling-latency-in-production)，答案中提到需要提高 [parsing_processes](https://airflow.apache.org/docs/apache-airflow/1.10.15/configurations-ref.html#parsing-processes) （ 1.10.14 版本之前为 `max_threads` ）和 [scheduler_heartbeat_sec](https://airflow.apache.org/docs/apache-airflow/1.10.15/configurations-ref.html#scheduler-heartbeat-sec) 的配置，但由于我们的 Airflow 跑在谷歌云的 Composer 上，直接提高 scheduler 心跳间隔反而会导致谷歌云误以为 scheduler 出了问题，从而给我们报假警，并且我根据官网的建议试着提高到了 60 秒，并没什么效果。同时 Airflow 的文档对于每条配置写得过于简略，单纯地阅读他们的[配置说明](https://airflow.apache.org/docs/apache-airflow/1.10.15/configurations-ref.html)不仅不容易找到自己想要的答案，反而很有可能被庞杂的配置参数淹没。

因此转而去谷歌云的文档里寻求帮助，所幸找到了他们的一篇[文章](https://cloud.google.com/blog/products/data-analytics/scale-your-composer-environment-together-your-business)详细讲解 scheduler 和 worker 是如何工作的。简单来说，配置中的 `parsing_processes` 控制 scheduler 可以并行的进程数，这些进程用来解析每一个 DAG 文件内容，检查任务依赖，并将其置为 SCHEDULED 状态，同时 scheduler 还需要有一个主进程来控制整个调度流程。因此答案就呼之欲出了， `parsing_processes` 的数量应设置为 scheduler 运行机器上的 CPU 数量减去一，因为要留下一个 CPU 来运行主进程。如果设置的太少，就会有几个核的资源被浪费掉，如果太多，那么大量的时间就会浪费在操作系统进程调度上。

为了最大化利用集群的资源， [parallelism](https://airflow.apache.org/docs/apache-airflow/1.10.15/configurations-ref.html#parallelism) 参数也需要进行调整，根据官网的解释，这个参数控制当前 Airflow 集群中一个 DAG 上的任务可以并行的最大数量，所以这个参数应该配置为 worker 机器的数量 \* 一台 worker 机器上 CPU 的数量，这样即使只有一个 DAG 在运行，所有的 worker 也都能够忙起来，可以大大缩短执行整个 DAG 的时间。同样地， [dag_concurrency](https://airflow.apache.org/docs/apache-airflow/1.10.15/configurations-ref.html#dag-concurrency) 参数需要设置为和 `parallelism` 同样的数值，因为它控制着 scheduler 同时调度任务的最大数量。

经过了上述对各种参数的理解和计算，我们决定将 Airflow 的参数作如下调整，

- \[scheduler\] parsing\_processes = scheduler 所在机器的 vCPU 个数 - 1
- \[core\] parallelism = worker 个数 \* 单个 worker 上的 vCPU 个数
- \[core\] dag\_concurrency = worker 个数 \* 单个 worker 上的 vCPU 个数

效果可谓是立竿见影，任务之间的调度间隔从几十分钟瞬间降到了几十秒。

如果不想自己计算，可以通过谷歌云提供的[计算表格](https://docs.google.com/spreadsheets/d/1z5m8yO67BqKpuxoIGxgKjqqKWyJ34U1dEdCBWHV7pTM/edit#gid=0)，输入 Airflow 集群的硬件参数，即可以在最下面得到最佳参数结果。

如果是第一次运行 Airflow 的朋友，建议直接从 Airflow 2.0 开始，根据他们的发布文档，针对 scheduler 的优化是这次大版本更新的重头戏。我也趁着研究 Airflow 的机会在谷歌云的 Composer 上启动了一个 Airflow 2.0 试验性地运行了一下我们自己的 DAG ，性能甚至比我自己调过参数的 Airflow 1.10.15 还要优秀，因此升级 2.0 就被加入了我们的工作待办列表了。

# 参考资料

- [Airflow 1.10.15 FAQ](https://airflow.apache.org/docs/apache-airflow/1.10.15/faq.html)
- [Airflow 1.10.15 参数说明手册](https://airflow.apache.org/docs/apache-airflow/1.10.15/configurations-ref.html)
- [Scale your Composer environment together with your business](https://cloud.google.com/blog/products/data-analytics/scale-your-composer-environment-together-your-business)
