---
title: 调度场算法
pubDate: 2020-11-29 17:33 PST
categories: ["聊聊技术"]
tags: Python, LeetCode, Dijkstra, 调度场算法, 逆波兰表达式, 算法
heroImage: /images/blog/shunting-yard-scaled.jpg
heroImageDescription: Photo by Bruno Kelzer on Unsplash
---

[调度场算法](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)由 [Edsger W. Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra) 发明，用于将中缀表达式转换成后缀表达式，即逆波兰表达式。写过程序的同行都了解，对于计算机来说，一个后缀表达式更容易被理解和计算，所以当处理我们看起来更习惯的中缀表达式时，例如 `(3 + 4) * 5 - 2 * (3 + 9)` ，往往会将其转换成 `3 4 + 5 * 2 3 9 + * -` 的形式，这样只需要一个栈结构就能得出正确结果 11 ，代码简单到什么程度呢？只要稍微有些数据结构知识的码农，都可以很快写出类似下面的代码。

```python
def calculate_reverse_polish_notation(tokens):
    stack = []
    for token in tokens:
        if token == '+':
            stack.append(stack.pop() + stack.pop())
        elif token == '-':
            a = stack.pop()
            b = stack.pop()
            stack.append(b - a)
        elif token == '*':
            stack.append(stack.pop() * stack.pop())
        elif token == '/':
            a = stack.pop()
            b = stack.pop()
            stack.append(b/a)
        else:
            stack.append(token)
    return stack[-1]
```

其中函数参数 `tokens` 包含逆波兰式中的所有数字和符号，例如 `[3 4 + 5 * 2 3 9 + * -]` 。

而如果我们想要计算机直接处理中缀表达式，就没有这么容易了，这时就需要先用调度场算法将其转换成逆波兰式，然后把输出结果输入到上述的函数中，才能得出结果。调度场算法的核心是维护两个栈结构，一个存数字，一个存除数字之外的运算符号，包括左右括号，当遇到数字时，直接将其放入数字栈，当遇到符号时，要根据当前符号的优先级以及符号栈中的内容来决定下一步操作。因为用到了两个栈来保存不同类型的字符，用图形表示的话与火车调度场非常类似，这也是算法得名的缘由。

具体来说，算法的运作方式如下（为了说明简单起见，假设中缀表达式中只有加减乘除和左右小括号），给定一个中缀表达式，

- **当**输入参数还有下一个字符时，
    - 读入下一个字符，
    - **如果**该字符为数字，将其压入数字栈；
    - **如果**该字符为运算符，
        - **当**符号栈不为空
            **并且**栈顶的运算符的优先级大于等于当前符号
            **并且**栈顶运算符不是左括号时，
            - 将符号栈顶的运算符弹出并压入数字栈；
        - 在上述条件不再满足时，将当前符号压入符号栈；
    - **如果**该字符为左括号，将其压入符号栈；
    - **如果**该字符为右括号，
        - **当**符号栈顶的符号不为左括号时，
            - 将符号栈顶的运算符弹出并压入数字栈；
        - **如果**此时符号栈顶的符号为左括号，将其弹出并舍弃；
- 此时已经读完的输入参数，检查符号栈，
    - **当**符号栈不为空时，
        - 将符号栈顶的运算符弹出并压入数字栈；
- 最终数字栈中的内容就是逆波兰式；

上述算法流程比较长，并且在遇到运算符时需要考虑的情况比较多，看起来并不是那么直观，但中心思想就是优先级高的符号应当优先放入输出结果中，这样才能保证处理逆波兰式的时候尽早把它加入运算结果中。下面我仿照[维基百科上的表格](https://en.wikipedia.org/wiki/Shunting-yard_algorithm#Detailed_example)，来逐步拆解一下调度场算法是如何处理文章一开始的算式的 `(3 + 4) * 5 - 2 * (3 + 9)` 。

<table><tbody><tr><td class="has-text-align-left" data-align="left">字符</td><td class="has-text-align-left" data-align="left">数字栈</td><td class="has-text-align-left" data-align="left">符号栈</td><td class="has-text-align-left" data-align="left">操作</td></tr><tr><td class="has-text-align-left" data-align="left">(</td><td class="has-text-align-left" data-align="left"></td><td class="has-text-align-left" data-align="left">(</td><td class="has-text-align-left" data-align="left">左括号直接压入符号栈</td></tr><tr><td class="has-text-align-left" data-align="left">3</td><td class="has-text-align-left" data-align="left">3</td><td class="has-text-align-left" data-align="left">(</td><td class="has-text-align-left" data-align="left">数字直接压入数字栈</td></tr><tr><td class="has-text-align-left" data-align="left">+</td><td class="has-text-align-left" data-align="left">3</td><td class="has-text-align-left" data-align="left">( +</td><td class="has-text-align-left" data-align="left">符号栈顶为左括号，加号直接入栈</td></tr><tr><td class="has-text-align-left" data-align="left">4</td><td class="has-text-align-left" data-align="left">3 4</td><td class="has-text-align-left" data-align="left">( +</td><td class="has-text-align-left" data-align="left">数字直接压入数字栈</td></tr><tr><td class="has-text-align-left" data-align="left">)</td><td class="has-text-align-left" data-align="left">3 4 +</td><td class="has-text-align-left" data-align="left"></td><td class="has-text-align-left" data-align="left">将符号栈中的符号压入数字栈，直到遇见左括号，然后将其舍弃</td></tr><tr><td class="has-text-align-left" data-align="left">*</td><td class="has-text-align-left" data-align="left">3 4 +</td><td class="has-text-align-left" data-align="left">*</td><td class="has-text-align-left" data-align="left">符号栈为空，直接压栈</td></tr><tr><td class="has-text-align-left" data-align="left">5</td><td class="has-text-align-left" data-align="left">3 4 + 5</td><td class="has-text-align-left" data-align="left">*</td><td class="has-text-align-left" data-align="left">数字直接压入数字栈</td></tr><tr><td class="has-text-align-left" data-align="left">-</td><td class="has-text-align-left" data-align="left">3 4 + 5 *</td><td class="has-text-align-left" data-align="left">-</td><td class="has-text-align-left" data-align="left">符号栈顶的运算符优先级大于减号，将其弹出并压入数字栈，然后将减号压入符号栈</td></tr><tr><td class="has-text-align-left" data-align="left">2</td><td class="has-text-align-left" data-align="left">3 4 + 5 * 2</td><td class="has-text-align-left" data-align="left">-</td><td class="has-text-align-left" data-align="left">数字直接压入数字栈</td></tr><tr><td class="has-text-align-left" data-align="left">*</td><td class="has-text-align-left" data-align="left">3 4 + 5 * 2</td><td class="has-text-align-left" data-align="left">- *</td><td class="has-text-align-left" data-align="left">符号栈顶的减号优先级小于乘号，直接将乘号压入符号栈</td></tr><tr><td class="has-text-align-left" data-align="left">(</td><td class="has-text-align-left" data-align="left">3 4 + 5 * 2</td><td class="has-text-align-left" data-align="left">- * (</td><td class="has-text-align-left" data-align="left">左括号直接压入符号栈</td></tr><tr><td class="has-text-align-left" data-align="left">3</td><td class="has-text-align-left" data-align="left">3 4 + 5 * 2 3</td><td class="has-text-align-left" data-align="left">- * (</td><td class="has-text-align-left" data-align="left">数字直接压入数字栈</td></tr><tr><td class="has-text-align-left" data-align="left">+</td><td class="has-text-align-left" data-align="left">3 4 + 5 * 2 3</td><td class="has-text-align-left" data-align="left">- * ( +</td><td class="has-text-align-left" data-align="left">符号栈顶为左括号，加号直接入栈</td></tr><tr><td class="has-text-align-left" data-align="left">9</td><td class="has-text-align-left" data-align="left">3 4 + 5 * 2 3 9</td><td class="has-text-align-left" data-align="left">- * ( +</td><td class="has-text-align-left" data-align="left">数字直接压入数字栈</td></tr><tr><td class="has-text-align-left" data-align="left">)</td><td class="has-text-align-left" data-align="left">3 4 + 5 * 2 3 9 +</td><td class="has-text-align-left" data-align="left">- *</td><td class="has-text-align-left" data-align="left">将符号栈中的符号压入数字栈，直到遇见左括号，然后将其舍弃</td></tr><tr><td class="has-text-align-left" data-align="left"></td><td class="has-text-align-left" data-align="left">3 4 + 5 * 2 3 9 + * -</td><td class="has-text-align-left" data-align="left"></td><td class="has-text-align-left" data-align="left">将符号栈中的所有符号弹出并压入数字栈</td></tr></tbody></table>

从上表就能很直观地看到中缀表达式是如何一步步地转换成后缀表达式的，算法的时间复杂度为 O(n) ，因为需要遍历中缀表达式中所有的字符，空间复杂度也为 O(n) ，因为用了两个栈来存储所有的字符，其中 n 为中缀表达式的长度。

这样不难把调度场算法翻译成代码，

```python
def shunting_yard_algorithm(s):
    numbers = []
    operators = []
    num = None
    for char in s:
        if ord("0") <= ord(char) <= ord("9"):
            if num is None:
                num = 0
            num = num * 10 + int(char)
        else:
            if num is not None:
                numbers.append(num)
                num = None
            if char == " ":
                continue
            elif char in "*/":
                while operators and operators[-1] in "*/":
                    numbers.append(operators.pop())
                operators.append(char)
            elif char in "+-":
                while operators and operators[-1] in "*/+-":
                    numbers.append(operators.pop())
                operators.append(char)
            elif char == "(":
                operators.append(char)
            elif char == ")":
                while operators and operators[-1] != "(":
                    numbers.append(operators.pop())
                if operators and operators[-1] == "(":
                    operators.pop()

    if num is not None:
        numbers.append(num)
    while operators:
        numbers.append(operators.pop())
    return numbers
```

两个函数结合之后，一个简单的中缀表达式计算器的小程序就完成了，著名的程序员内卷刷题网站 LeetCode 上也有相关的问题可以练习。

- [Basic Calculator](https://leetcode.com/problems/basic-calculator/)

- [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/)

- [Basic Calculator III](https://leetcode.com/problems/basic-calculator-iii/)
