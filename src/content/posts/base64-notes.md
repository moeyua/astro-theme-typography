---
title: Base64 编码学习笔记（ Java 实现）
pubDate: 2020-02-14 20:54 PST
categories: ["聊聊技术"]
tags: Base64, Java
heroImage: /images/blog/matrix-coding-scaled.jpg
heroImageDescription: Photo by Markus Spiske on Unsplash
---

但凡从事码工这一行，多多少少会遇到 [Base64 编码](https://en.wikipedia.org/wiki/Base64)这个概念，因为我们总要接触互联网，而 Base64 编码诞生的目的就是为了让二进制数据能够在只支持文本的媒介上传输，比如说在网络上传输一张图片或者一段音频。而 Base64 本身是一种无损编码转换规则，同时编码后的内容与原始内容差别非常大，所以很多时候大家在网上留联系方式的时候也喜欢用 Base64 转换一下，既能把信息传达给网友，又避免了充斥在网络上的各种机器人的骚扰，比如[这位朋友](https://wilbeibi.com/about/)的自我介绍，甚至还贴心地给出了完整的解码命令行。

# 理论

那么 Base64 的编码规则是怎样的？因为在计算机的世界中，所有的内容都以字节数组（ Byte Array ）的形式呈现，所以 Base64 的输入数据自然是字节数组，每一个字节有 8 位 bit ， Base64 以每三个字节为一组，然后均分成四份，每一份有 6 个 bit ，而这 6 个 bit ，恰好就能对应到 64 个指定的 ASCII 字符上去。转换规则如下（抄自[维基百科](https://en.wikipedia.org/wiki/Base64#Base64_table)）

<table style="text-align:center"><tbody><tr><th scope="col">Index</th><th scope="col">Binary</th><th scope="col">Char</th><td rowspan="17"></td><th scope="col">Index</th><th scope="col">Binary</th><th scope="col">Char</th><td rowspan="17"></td><th scope="col">Index</th><th scope="col">Binary</th><th scope="col">Char</th><td rowspan="17"></td><th scope="col">Index</th><th scope="col">Binary</th><th scope="col">Char</th></tr><tr><td>0</td><td>000000</td><td><code>A</code></td><td>16</td><td>010000</td><td><code>Q</code></td><td>32</td><td>100000</td><td><code>g</code></td><td>48</td><td>110000</td><td><code>w</code></td></tr><tr><td>1</td><td>000001</td><td><code>B</code></td><td>17</td><td>010001</td><td><code>R</code></td><td>33</td><td>100001</td><td><code>h</code></td><td>49</td><td>110001</td><td><code>x</code></td></tr><tr><td>2</td><td>000010</td><td><code>C</code></td><td>18</td><td>010010</td><td><code>S</code></td><td>34</td><td>100010</td><td><code>i</code></td><td>50</td><td>110010</td><td><code>y</code></td></tr><tr><td>3</td><td>000011</td><td><code>D</code></td><td>19</td><td>010011</td><td><code>T</code></td><td>35</td><td>100011</td><td><code>j</code></td><td>51</td><td>110011</td><td><code>z</code></td></tr><tr><td>4</td><td>000100</td><td><code>E</code></td><td>20</td><td>010100</td><td><code>U</code></td><td>36</td><td>100100</td><td><code>k</code></td><td>52</td><td>110100</td><td><code>0</code></td></tr><tr><td>5</td><td>000101</td><td><code>F</code></td><td>21</td><td>010101</td><td><code>V</code></td><td>37</td><td>100101</td><td><code>l</code></td><td>53</td><td>110101</td><td><code>1</code></td></tr><tr><td>6</td><td>000110</td><td><code>G</code></td><td>22</td><td>010110</td><td><code>W</code></td><td>38</td><td>100110</td><td><code>m</code></td><td>54</td><td>110110</td><td><code>2</code></td></tr><tr><td>7</td><td>000111</td><td><code>H</code></td><td>23</td><td>010111</td><td><code>X</code></td><td>39</td><td>100111</td><td><code>n</code></td><td>55</td><td>110111</td><td><code>3</code></td></tr><tr><td>8</td><td>001000</td><td><code>I</code></td><td>24</td><td>011000</td><td><code>Y</code></td><td>40</td><td>101000</td><td><code>o</code></td><td>56</td><td>111000</td><td><code>4</code></td></tr><tr><td>9</td><td>001001</td><td><code>J</code></td><td>25</td><td>011001</td><td><code>Z</code></td><td>41</td><td>101001</td><td><code>p</code></td><td>57</td><td>111001</td><td><code>5</code></td></tr><tr><td>10</td><td>001010</td><td><code>K</code></td><td>26</td><td>011010</td><td><code>a</code></td><td>42</td><td>101010</td><td><code>q</code></td><td>58</td><td>111010</td><td><code>6</code></td></tr><tr><td>11</td><td>001011</td><td><code>L</code></td><td>27</td><td>011011</td><td><code>b</code></td><td>43</td><td>101011</td><td><code>r</code></td><td>59</td><td>111011</td><td><code>7</code></td></tr><tr><td>12</td><td>001100</td><td><code>M</code></td><td>28</td><td>011100</td><td><code>c</code></td><td>44</td><td>101100</td><td><code>s</code></td><td>60</td><td>111100</td><td><code>8</code></td></tr><tr><td>13</td><td>001101</td><td><code>N</code></td><td>29</td><td>011101</td><td><code>d</code></td><td>45</td><td>101101</td><td><code>t</code></td><td>61</td><td>111101</td><td><code>9</code></td></tr><tr><td>14</td><td>001110</td><td><code>O</code></td><td>30</td><td>011110</td><td><code>e</code></td><td>46</td><td>101110</td><td><code>u</code></td><td>62</td><td>111110</td><td><code>+</code></td></tr><tr><td>15</td><td>001111</td><td><code>P</code></td><td>31</td><td>011111</td><td><code>f</code></td><td>47</td><td>101111</td><td><code>v</code></td><td>63</td><td>111111</td><td><code>/</code></td></tr></tbody></table>

那么如果输入的字节长度不是 3 的整数倍，最后的一个或两个字节岂不是就无法应用上述规则了吗？所以 Base64 规定，对于末尾的空位，用等号 `=` 补齐，因此转换而成的 Base64 编码的长度总是 4 的整数倍。

简而言之，给一段二进制数据进行 Base64 编码时，需要以下三步

1. 将每三个字节归并到一组，末尾不足三位的留出来单独处理
2. 将每一组 24 个 bit 分成四份，每份 6 个 bit ，从上表中找到相应的 ASCII 字符放到该位置
3. 将末尾的一位或两位字节分别用零补齐到 12 位 bit 或 18 位 bit ，从表中找到相应的字符填空，末尾用等号 `=` 补齐四位

[维基](https://en.wikipedia.org/wiki/Base64#Examples)上也给出了不同情况下的转换示例

- 二进制字节的长度恰好为 3 的整数倍（ `Man` => `TWFu` ）

    <table style="text-align:center;"><tbody><tr style="font-weight:bold;"><th rowspan="2" scope="row">Source</th><th scope="row">Text (ASCII)</th><td colspan="8">M</td><td colspan="8">a</td><td colspan="8">n</td></tr><tr><th scope="row">Octets</th><td colspan="8">77 (0x4d)</td><td colspan="8">97 (0x61)</td><td colspan="8">110 (0x6e)</td></tr><tr><th colspan="2" scope="row">Bits</th><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr><tr><th rowspan="3" scope="row">Base64<br>encoded</th><th scope="row">Sextets</th><td colspan="6">19</td><td colspan="6">22</td><td colspan="6">5</td><td colspan="6">46</td></tr><tr style="font-weight:bold;"><th scope="row">Character</th><td colspan="6">T</td><td colspan="6">W</td><td colspan="6">F</td><td colspan="6">u</td></tr><tr><th scope="row">Octets</th><td colspan="6">84 (0x54)</td><td colspan="6">87 (0x57)</td><td colspan="6">70 (0x46)</td><td colspan="6">117 (0x75)</td></tr></tbody></table>


- 二进制字节的末尾余两位（ `Ma` => `TWE=` ）

    <table style="text-align:center;"><tbody><tr style="font-weight:bold;"><th rowspan="2" scope="row">Source</th><th scope="row">Text (ASCII)</th><td colspan="8">M</td><td colspan="8">a</td><td colspan="8" rowspan="2" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na" data-sort-value=""></td></tr><tr><th scope="row">Octets</th><td colspan="8">77 (0x4d)</td><td colspan="8">97 (0x61)</td></tr><tr><th colspan="2" scope="row">Bits</th><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td style="background-color:lightblue;">0</td><td style="background-color:lightblue;">0</td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td></tr><tr><th rowspan="3" scope="row">Base64<br>encoded</th><th scope="row">Sextets</th><td colspan="6">19</td><td colspan="6">22</td><td colspan="6">4</td><td colspan="6" data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na">Padding</td></tr><tr style="font-weight:bold;"><th scope="row">Character</th><td colspan="6">T</td><td colspan="6">W</td><td colspan="6">E</td><td colspan="6">=</td></tr><tr><th scope="row">Octets</th><td colspan="6">84 (0x54)</td><td colspan="6">87 (0x57)</td><td colspan="6">69 (0x45)</td><td colspan="6">61 (0x3D)</td></tr></tbody></table>


- 二进制字节的末尾余一位（ `M` => `TQ==` ）

    <table style="text-align:center;"><tbody><tr style="font-weight:bold;"><th rowspan="2" scope="row">Source</th><th scope="row">Text (ASCII)</th><td colspan="8">M</td><td colspan="16" rowspan="2" data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"></td></tr><tr><th scope="row">Octets</th><td colspan="8">77 (0x4d)</td></tr><tr><th colspan="2" scope="row">Bits</th><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td><td style="background-color:lightblue;">0</td><td style="background-color:lightblue;">0</td><td style="background-color:lightblue;">0</td><td style="background-color:lightblue;">0</td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td><td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na"><span class="nowrap"> </span></td></tr><tr><th rowspan="3" scope="row">Base64<br>encoded</th><th scope="row">Sextets</th><td colspan="6">19</td><td colspan="6">16</td><td colspan="6" data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na">Padding</td><td colspan="6" data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; font-size: smaller; text-align: center;" class="table-na">Padding</td></tr><tr style="font-weight:bold;"><th scope="row">Character</th><td colspan="6">T</td><td colspan="6">Q</td><td colspan="6">=</td><td colspan="6">=</td></tr><tr><th scope="row">Octets</th><td colspan="6">84 (0x54)</td><td colspan="6">81 (0x51)</td><td colspan="6">61 (0x3D)</td><td colspan="6">61 (0x3D)</td></tr></tbody></table>


解码的过程就是编码的逆过程，同样地，也可以用三步来概括

1. 将 Base64 字符串每四个分为一组，从上表中找到每个字符对应的 6 位二进制码，拼在一起成 24 位 bit 串
2. 将这 24 位 bit 串均分为三份，每部分 8 个 bit 作为一个字节，直接放到解码结果相应的位置
3. 最后的四位字符，拿掉末尾所有的等号，根据末尾等号的个数（一位还是两位）判断需要从末尾拿走几个零，最后解码为两位或一位字节

# 实践

为了证明自己会写 Java ，闲暇时用 Java + Maven 简单写了一个 Base64 的编码和解码方法。为了节约篇幅，这里省掉了类的定义以及依赖的引入。

## 编码

```java
private final static byte[] encodeMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".getBytes();
public static byte[] encode(byte[] plainBytes) {
    if (plainBytes.length == 0) {
        return "".getBytes();
    }
    int encodedLength = (plainBytes.length % 3 == 0) ? plainBytes.length/3 * 4 : (plainBytes.length/3 + 1) * 4;
    byte[] encodedBytes = new byte[encodedLength];
    int i = 0, j = 0;
    while (i < plainBytes.length / 3 * 3) {
        int value = plainBytes[i] << 16 | plainBytes[i+1] << 8 | plainBytes[i+2];
        encodedBytes[j] = encodeMap[value>>18&0x3f];
        encodedBytes[j+1] = encodeMap[value>>12&0x3f];
        encodedBytes[j+2] = encodeMap[value>>6&0x3f];
        encodedBytes[j+3] = encodeMap[value&0x3f];
        i += 3;
        j += 4;
    }
    int remains = plainBytes.length - i;
    if (remains > 0) {
        int value = plainBytes[i] << 16;
        if (remains == 2) {
            value |= plainBytes[i+1] << 8;
        }
        encodedBytes[j] = encodeMap[value>>18&0x3f];
        encodedBytes[j+1] = encodeMap[value>>12&0x3f];
        if (remains == 1) {
            encodedBytes[j+2] = '=';
            encodedBytes[j+3] = '=';
        } else if (remains == 2) {
            encodedBytes[j+2] = encodeMap[value>>6&0x3f];
            encodedBytes[j+3] = '=';
        }
    }
    return encodedBytes;
}
```

## 解码

```java
// decodeMap 的初始化需借助上面的 encodeMap ，其实质上是一个 ASCII 字符到它在 encodeMap 中位置的映射
private final static Map<Byte, Integer> decodeMap = new HashMap<Byte, Integer>();
static {
    for (int i = 0; i < encodeMap.length; i++) {
        decodeMap.put(encodeMap[i], i);
    }
}
public static byte[] decode(byte[] encodedBytes) {
    if (encodedBytes.length == 0) {
        return "".getBytes();
    }
    int decodedLength = (encodedBytes.length - 4) / 4 * 3;
    if (encodedBytes[encodedBytes.length-1] == '=' && encodedBytes[encodedBytes.length-2] == '=') {
        decodedLength += 1;
    } else if (encodedBytes[encodedBytes.length-1] == '=') {
        decodedLength += 2;
    } else {
        decodedLength += 3;
    }
    byte[] decodedBytes = new byte[decodedLength];
    int i = 0, j = 0;
    while (i < encodedBytes.length - 4) {
        int value = decodeMap.get(encodedBytes[i])<<18 | decodeMap.get(encodedBytes[i+1])<<12 | decodeMap.get(encodedBytes[i+2])<<6 | decodeMap.get(encodedBytes[i+3]);
        decodedBytes[j] = (byte)(value>>16&0xff);
        decodedBytes[j+1] = (byte)(value>>8&0xff);
        decodedBytes[j+2] = (byte)(value&0xff);
        i += 4;
        j += 3;
    }
    if (decodedLength - j == 1) {
        int value = decodeMap.get(encodedBytes[i])<<18 | decodeMap.get(encodedBytes[i+1])<<12;
        decodedBytes[j] = (byte)(value>>16&0xff);
    } else if (decodedLength - j == 2) {
        int value = decodeMap.get(encodedBytes[i])<<18 | decodeMap.get(encodedBytes[i+1])<<12 | decodeMap.get(encodedBytes[i+2])<<6;
        decodedBytes[j] = (byte)(value>>16&0xff);
        decodedBytes[j+1] = (byte)(value>>8&0xff);
    } else {
        int value = decodeMap.get(encodedBytes[i])<<18 | decodeMap.get(encodedBytes[i+1])<<12 | decodeMap.get(encodedBytes[i+2])<<6 | decodeMap.get(encodedBytes[i+3]);
        decodedBytes[j] = (byte)(value>>16&0xff);
        decodedBytes[j+1] = (byte)(value>>8&0xff);
        decodedBytes[j+2] = (byte)(value&0xff);
    }
    return decodedBytes;
}
```
