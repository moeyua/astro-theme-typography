---
title: 圆锥曲线二级结论
pubDate: 2024-09-07
categories: ['数学']
description: '嘶…'
---

## 解析几何 二级结论



直线
--

### **直线的夹角**

1.  倒角公式：tan⁡θ\=|tan⁡(β−α)|\=|tan⁡β−tan⁡α1+tan⁡β⋅tan⁡α|\=|k2−k11+k2⋅k1|\\tan\\theta=|\\tan(\\beta-\\alpha)|=|\\cfrac{\\tan\\beta-\\tan\\alpha}{1+\\tan\\beta\\cdot\\tan\\alpha}|=|\\cfrac{k\_2-k\_1}{1+k\_2\\cdot k\_1}|
2.  利用直线的方向向量算夹角
    1.  斜率与方向向量的关系：当直线 ll 的斜率为 kk 时，ll 的一个方向向量为 m\=(L,k)m=(L,k) ；当直线 ll 的斜率不存在时， ll 的一个方向向量为 m\=(0,1)m=(0,1) .
    2.  计算两直线的夹角余弦：设直线 l1l\_1 的一个方向向量为 mm ，直线 l2l\_2 的一个方向向量为 nn ， l1l\_1 与 l2l\_2 的夹角为 θ\\theta ，则 cos⁡θ\=|cos⁡α<m,n\>|\=|m⋅n||m|⋅|n|\\cos\\theta=|\\cos\\alpha<m,n>| = \\cfrac{|m\\cdot n|} {| m | \\cdot |n| } .

### **直线相关的对称问题**

1.  点关于直线对称：欲求点 AA 关于直线 ll 的对称点 A′A' ，可设 A′(a,b)A'(a,b) ，用 AA′⊥lAA'⊥l 和 AA′AA' 的中点在直线 ll 上来建立方程组求解 aa 和 bb .
    
    **特殊情况**：当 ll 的斜率是 ±1\\pm1 时，可直接由 ll 的方程分别将 x,yx,y 反解出来，再将点 AA 的坐标分别代入即可求得 A′A' 的坐标
    
    > 如：点 A(1,2)A(1,2) 关于直线 l:x+y−2\=0l:x+y-2=0 的对称点 A′A' ，求 A′A'
    > 
    > x+y−2\=0(k\=−1){x\=2−yA→y\=0y\=2−xA→x\=1⇒A′(0,1)x+y-2=0(k=-1)\\begin{cases} x=2-y\_A\\rightarrow y=0\\\\ y=2-x\_A\\rightarrow x=1 \\end{cases}\\Rightarrow A'(0,1)
    
2.  直线与直线对称:倾斜角互补的 4 种不同说法（斜率和为0）
    
    1.  直线 a 和 a ^ { \\prime } 关于水平线 l 对称（或者说 l 为角平分线）
        
    2.  直线 a 和 a ^ { \\prime } 关于竖直线 l 对称（或者说 l 为角平分线）
        
    3.  直线 a 和 a ^ { \\prime } 与 x 轴围出底角在 x 轴上的等腰三角形
        
    4.  直线 a 和 a ^ { \\prime } 与 y 轴围出底角在 y 轴上的等腰三角形
        
    
    ![](https://pic1.zhimg.com/v2-d58ab896a9b8d29045b1af408332c8a4_b.jpg)
    

圆
-

### **[参数方程](https://zhida.zhihu.com/search?q=%E5%8F%82%E6%95%B0%E6%96%B9%E7%A8%8B&zhida_source=entity&is_preview=1)**

设圆 C: \\left( x - a \\right) ^ { 2 } + \\left( y - b \\right) ^ { 2 } = r ^ { 2 } \\left( r > 0 \\right) ,则对于圆 C 上的动点 P \\left( x , y \\right) ，其横纵坐标满足 \\begin{cases} x=a+r\\cos\\theta\\\\ y=b+r\\sin\\theta \\end{cases}\\\\ . 故 P 坐标可设为 (a+r \\cos\\theta , b+r\\sin\\theta ) （这种设法中的几何意义可参考下图），涉及圆上动点的最值问题，可考虑用三角换元将求最值的目标表示成关于 θ 的三角函数来分析.

### **隐圆问题：圆的三大定义**

1.  定长对定点：平面上到定点 C(a,b) 的距离等于定长 r 的点 P 的轨迹是圆，如图 1.
    
2.  定长对定角：
    
    1.  平面上过两定点 A 和 B 的直线 l\_1、l\_2 互相垂直，则它们交点 P 的轨迹为圆，如图 2.
    2.  平面上与两定点 A 和 B 所成视角为固定锐角或[钝角](https://zhida.zhihu.com/search?q=%E9%92%9D%E8%A7%92&zhida_source=entity&is_preview=1)的点的轨迹为一段圆弧，如图 3.
3.  定长对定比（[阿氏圆](https://zhida.zhihu.com/search?q=%E9%98%BF%E6%B0%8F%E5%9C%86&zhida_source=entity&is_preview=1)）：设 A 和 B 是平面内两定点，若点 P 满足\\cfrac{|PA|}{|PB|}=\\lambda(\\lambda>0\\&\\lambda\\not=1)，则点 P 的轨迹是圆，该圆被称为阿氏圆，如图 4.
    

[二次曲线](https://zhida.zhihu.com/search?q=%E4%BA%8C%E6%AC%A1%E6%9B%B2%E7%BA%BF&zhida_source=entity&is_preview=1)共有结论
------------------------------------------------------------------------------------------------------------------

### 切线与切点弦改一半法则（极点极线）

改半法则\\begin{cases} x^2\\rightarrow x\_0x\\\\ y^2\\rightarrow y\_0y\\\\ x\\rightarrow \\cfrac{x\_0+x}{2}\\\\ y\\rightarrow \\cfrac{y\_0+y}{2}\\\\ (x-a)^2\\rightarrow (x\_0-a)(x-a)\\\\ (y-b)^2\\rightarrow (y\_0-b)(y-b)\\\\ \\end{cases}

当点 P(x\_0,y\_0) 在二次曲线上可改出切线或切点弦方程

![](https://pic2.zhimg.com/v2-3501f42355b48953b316773320117f53_b.jpg)

1.  圆
    
    1.  [曲线方程](https://zhida.zhihu.com/search?q=%E6%9B%B2%E7%BA%BF%E6%96%B9%E7%A8%8B&zhida_source=entity&is_preview=1)：x ^ { 2 } + y ^ { 2 } + A x + B y + C = 0
    2.  切线/切点弦方程：x\_0x+y\_0y+\\cfrac{A}{2}(x\_0+x)+\\cfrac{B}{2}(y\_0+y)+C=0
2.  椭圆
    
    1.  曲线方程：\\cfrac { x ^ { 2 } } { a ^ { 2 } } + \\cfrac { y ^ { 2 } } { b ^ { 2 } } = 1
    2.  切线/切点弦方程：\\cfrac { x \_ { 0 } x } { a ^ { 2 } } + \\cfrac { y \_ { 0 } y } { b ^ { 2 } } = 1
3.  双曲线
    
    1.  曲线方程：\\cfrac { x ^ { 2 } } { a ^ { 2 } } - \\cfrac { y ^ { 2 } } { b ^ { 2 } } = 1
    2.  切线/切点弦方程：\\cfrac { x \_ { 0 } x } { a ^ { 2 } } - \\cfrac { y \_ { 0 } y } { b ^ { 2 } } = 1
4.  抛物线
    
    1.  曲线方程：y^2=2px
    2.  切线/切点弦方程：y\_0y=p(x\_0+x)

> 大题运用示例（以椭圆为例）
> 
> 1.  书写：设 P(x\_0,y\_0) 的切线斜率为 k ，切线 l:y-y\_0=k(x-x\_0)
> 2.  书写：联立椭圆方程：\\begin{cases}y-y\_0=k(x-x\_0)\\\\\\cfrac { x ^ { 2 } } { a ^ { 2 } } + \\cfrac { y ^ { 2 } } { b ^ { 2 } } = 1\\end{cases}
> 3.  由上述技巧可推：\\cfrac { x \_ { 0 } x } { a ^ { 2 } } + \\cfrac { y \_ { 0 } y } { b ^ { 2 } } = 1\\Rightarrow y=\\cfrac{b^2}{y\_0}-\\cfrac{b^2x\_0}{y\_0a^2}x
> 4.  书写：令 \\Delta=0 ，解得 k=-\\cfrac{b^2x\_0}{y\_0a^2}

### 三大曲线的第二定义

\\cfrac{PF}{PP'}=e\\begin{cases}椭圆:e=\\cfrac{c}{a}∈(0,1)\\\\双曲线:e=\\cfrac{c}{a}∈(1,+∞)\\\\抛物线:e=1\\end{cases}

运用——焦半径公式

椭圆：PF=a-ex\_0;PF\_1=a+ex\_0

双曲线：|PF\_1|=ex\_0+a;|PF\_2|=ex\_0-a;|QF\_1|=-ex\_0-a;|QF\_2|=-ex\_0+a

抛物线：PF=PP'=x\_0+\\cfrac{p}{2}

### 椭圆双曲线焦半径

椭圆 \\cfrac { x ^ { 2 } } { a ^ { 2 } } + \\cfrac { y ^ { 2 } } { b ^ { 2 } } = 1 \\left( a > b > 0 \\right)的左、右焦点分别为 F \_ { 1 } 、 F \_ { 2 } ，点 P \\left( x \_ { 0 } , y \_ { 0 } \\right) 为椭圆上任意一点，则椭圆的焦半径 | P F \_ { 1 } | 和 | P F \_ { 2 } | 可按下面的公式计算（当 P 位于 x 轴下方时，将下述焦半径公式中的 \\alpha、\\beta 上加 \\pi 即可）

1.  |P F \_ { 1 } | = a + e x \_ { 0 } = \\cfrac { b ^ { 2 } } { a - c \\cos \\alpha }
2.  |P F \_ { 2 } | = a - e x \_ { 0 } = \\cfrac { b ^ { 2 } } { a + c \\cos \\beta }
3.  | P Q | = \\cfrac { 2 a b ^ { 2 } } { a ^ { 2 } - c ^ { 2 } \\cos ^ { 2 } \\alpha }

推导：

\\begin{alignat\*}{6} |PF| &= \\sqrt{(x\_0 + c)^2 + y\_{0}^2} \\\\ &= \\sqrt{x\_0^2 + 2cx\_{0} + c^2 + y\_{0}^2} \\\\ &= \\sqrt{x\_0^2 + 2cx\_{0} + c^2 + b^2\\left(1-\\cfrac{x\_0^2}{a^2}\\right)} \\\\ &= \\sqrt{\\cfrac{c^2}{a^2}x\_0^2 + 2cx\_{0} + a^2} \\\\ &= \\sqrt{\\left(\\cfrac{c}{a}x\_0+a\\right)^2} \\\\ &= a+ex\_0 \\\\ \\end{alignat\*}

双曲线焦半径公式

1.  |P F \_ { 1 } | = |a + e x \_ { 0 }|
2.  |P F \_ { 2 } | = |a - e x \_ { 0 }|

![](https://pic3.zhimg.com/v2-9b4a84dfdc00ac9845252d5fe65eba12_b.jpg)

### 焦半径的倒数和结论

**涉及[焦点弦](https://zhida.zhihu.com/search?q=%E7%84%A6%E7%82%B9%E5%BC%A6&zhida_source=entity&is_preview=1)焦半径长度问题时用**

过焦点 F 且不平行于坐标轴的弦为 AB，则 \\cfrac{1}{AF}+\\cfrac{1}{BF}=\\cfrac{4}{L} （ L 为通径长度）

### 第三定义与点差斜率积结论（[垂径定理](https://zhida.zhihu.com/search?q=%E5%9E%82%E5%BE%84%E5%AE%9A%E7%90%86&zhida_source=entity&is_preview=1)）

1.  椭圆：
    
    1.  第三定义结论：关于[原点对称](https://zhida.zhihu.com/search?q=%E5%8E%9F%E7%82%B9%E5%AF%B9%E7%A7%B0&zhida_source=entity&is_preview=1)的 A、B满足 k\_{PA}\\cdot k\_{PB}=-\\cfrac{b^2}{a^2}
        
    2.  [点差法](https://zhida.zhihu.com/search?q=%E7%82%B9%E5%B7%AE%E6%B3%95&zhida_source=entity&is_preview=1)结论： k\_{PA}\\cdot k\_{OG}=-\\cfrac{b^2}{a^2}
        
2.  双曲线：
    
    1.  第三定义结论：关于原点对称的 A、B满足 k\_{PA}\\cdot k\_{PB}=\\cfrac{b^2}{a^2}
        
    2.  点差法结论： k\_{PA}\\cdot k\_{OG}=\\cfrac{b^2}{a^2}
        
        ![](https://pic3.zhimg.com/v2-d0f1e705a014ab9d5588c4db810de22a_b.jpg)
        
3.  抛物线的弦中点结论
    
    C : y ^ { 2 } = 2 p x \\left( p > 0 \\right)中的结论有 k = \\cfrac { p } { y \_ { 0 } } \\left( y \_ { 0 } \\ne 0 \\right)
    
    k\_{AB}=\\cfrac { y \_ { 1 }- y \_ { 2 } } { \\cfrac { y\_1^2 } { 2p }-\\cfrac { y\_2^2 } { 2p } } = \\cfrac { 2 p } { y \_ { 1 } + y \_ { 2 } } = \\cfrac { p } { y \_ { 0 } } → y \_ { 0 } \\cdot k \_ { A B } = p
    

### 椭圆双曲线 焦点三角形

作用：实现坐标与顶角及面积之间的互相转化

1.  椭圆：S\_{PF\_1F\_2}=c\\cdot|y\_P|=b^2\\tan\\cfrac{\\theta}{2}=(a+c)\\cdot r
2.  双曲线：S\_{PF\_1F\_2}=c|y\_P|=\\cfrac{b^2}{\\tan\\cfrac{\\theta}{2}}

### 椭圆、双曲线的距离问题

1.  椭圆
    1.  椭圆上一点到原点的距离：\[b,a\]
    2.  椭圆上一点到焦点的距离：\[a-c,a+c\]
2.  双曲线
    1.  双曲线上一点到原点的距离：\[a,+\\infty)
    2.  焦点到渐进线的距离：b

### 椭圆、双曲线、抛物线的光学性质

1.  椭圆：与 P 处切线垂直的法线为 ∠ F\_1PF\_2 的角平分线
2.  双曲线： P 处的切线即为 ∠ F\_1PF\_2 的角平分线
3.  抛物线：与 P 处切线垂直的法线与 x 轴平行

> 原文使用 [Zhihu On VSCode](https://zhuanlan.zhihu.com/p/106057556) 创作并发布