---
title: 趁着新鲜劲，折腾一下rime输入法
pubDate: 2024-04-07 16:24:23
categories: [生活]
description: '记录一下Mac下输入法的使用历程以及这次折腾rime输入法的步骤……'
---

不知不觉用Mac差不多十四五年了，从刚开始用不惯原生输入法，而去安装搜狗输入法，一直到现在使用Mac系统自带的输入法，中间其实也没少折腾，今天中午没事干就准备顺便折腾一下Rime输入法，刚好也在撑着新鲜劲在blog上记录一下。

Rime（中州韵）在Mac上的版本叫鼠须管，听说这是一种毛笔的名字，这个我也不是很清楚，其实在五六年前我就折腾过一次这个输入法，当时的电脑还是intel平台的Mac，当时macOS自带的输入法说实话，跟iOS上原生输入法比都有差距，再加上电脑比较老，打字会有卡顿的感觉，开的软件多了甚至会出现我一整句话已经打完了屏幕上还没有显示出一半的情况。当时就想着算了，换个开源的输入法试试吧，可能开源输入法跟Linux一样，对电脑配置的要求没有那么高呢。于是就在网上找有些什么样的开源输入法可以用，就找到了Rime，折腾的过程记不太清了，就记得最后因为输入界面有点不符合我的审美，再加上应该是我没有配置好的原因吧，感觉比macOS自带的输入法还难用，坚持不下去还是删了。

今天安装Rime主要是用的BaiYun大佬写的教程[[RIME 鼠须管输入法简明使用教程](https://baiyun.me/rime-simple-tutorial)]，除了需要配置一下配置文件外，可以说是开箱即用，体验比我当年使用要好太多。说实话，要是当年就有这么详细的教程我也不至于花钱买落格输入法（个人感觉也不好用）。

下面大致记录一下配置过程吧，大部分其实都是复制BaiYun大佬写的教程里的步骤和文件，少部分针对我个人的使用习惯做了修改，提前说明一下，这篇blog只是为了记录我折腾rime输入法的过程，并不是使用教程，要是想看教程的话推荐去看[[RIME 鼠须管输入法简明使用教程](https://baiyun.me/rime-simple-tutorial)]。

---

首先是下载安装配置工具、配置文件和鼠须管本体

```shell
# 为了便于管理，我电脑上所有的clone项目都是在developer文件夹下
cd ~developer

# 安装plum，也就是Rime官方的配置管理工具，安装完成后进入plum文件夹
git clone --depth=1 https://github.com/rime/plum
cd plum

# 安装 Rime 配置：雾凇拼音
bash rime-install iDvel/rime-ice:others/recipes/full

# 使用Homebrew安装 鼠须管
brew install --cask squirrel
```

注意，在安装完成后你在“设置”-“键盘”-“输入法”-“+”-“简体中文”中是看不到鼠须管的，必须登出系统重新登入才能添加鼠须管。

当将鼠须管添加为输入法后其实就可以正常使用了，但可能雾凇拼音的界面有些人会不太适应，同时也没有配置iCloud同步、模糊音、中英文切换等设置，所以下面对个人配置进行设置。

首先尽心rime设置，打开终端，输入`nano ~/Library/Rime/default.custom.yaml`(BaiYun大佬使用的是vim，但是我不会用，还是nano方便)，将以下配置复制进去。

```yaml
# Rime Patch settings
# encoding: utf-8

patch:
  # 方案列表
  schema_list:
    - schema: rime_ice

  # 中西文切换
  #
  # 【good_old_caps_lock】 CapsLock 切换到大写或切换中英。
  # （macOS 偏好设置的优先级更高，如果勾选【使用大写锁定键切换“ABC”输入法】则始终会切换输入法）
  #
  # 切换中英：
  # 不同的选项表示：打字打到一半时按下了 CapsLock、Shift、Control 后：
  # commit_code  上屏原始的编码，然后切换到英文
  # commit_text  上屏拼出的词句，然后切换到英文
  # clear        清除未上屏内容，然后切换到英文
  # inline_ascii 无输入时，切换中英；有输入时，切换到临时英文模式，按回车上屏后回到中文状态
  # noop         屏蔽快捷键，不切换中英，但不要屏蔽 CapsLock
  ascii_composer:
    good_old_caps_lock: true  # true | false
    switch_key:
      Caps_Lock: commit_code   # commit_code | commit_text | clear
      Shift_L: noop    # commit_code | commit_text | inline_ascii | clear | noop
      Shift_R: noop    # commit_code | commit_text | inline_ascii | clear | noop
      Control_L: noop          # commit_code | commit_text | inline_ascii | clear | noop
      Control_R: noop          # commit_code | commit_text | inline_ascii | clear | noop
```

这个配置文件主要是将默认启用的双拼删除，只保留全拼（schema：rime_ice）,然后中英文切换与macOS系统自带输入法相同，使用CapsLock键（这里需要说明一下，其实我并不喜欢使用CapsLock键进行中英文切换，主要是这次买的Mac是在PDD百亿补贴买的，键盘不能定制成美式键盘，买回来用了半年多已近习惯使用CapsLock切换了，就暂时这样吧，毕竟键盘上写的也是“中/英”么），后续有时间好好研究一下在对这个切换中英文输入法的设置再重新弄一下。

然后就是对我比较实用的模糊音和智能纠错，上面这段文字我是在没有模糊音和智能纠错的情况下打的，这没设置模糊音真的是太痛苦了。。。

先使用nano创建配置文件`nano ~/Library/Rime/rime_ice.custom.yaml`，把下面的内容复制到里面

```yaml
patch:
  # 拼写设定
  speller:
    # 如果不想让什么标点直接上屏，可以加在 alphabet，或者编辑标点符号为两个及以上的映射
    alphabet: zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA
    delimiter: " '"  # 第一位<空格>是拼音之间的分隔符；第二位<'>表示可以手动输入单引号来分割拼音。
    algebra:
      ### 模糊音
      # 声母
      # - derive/^([zcs])h/$1/          # z c s → zh ch sh
      # - derive/^([zcs])([^h])/$1h$2/  # zh ch sh → z c s
      # - derive/^l/n/  # n → l
      # - derive/^n/l/  # l → n
      # - derive/^f/h/  # …………
      # - derive/^h/f/  # …………
      # - derive/^l/r/
      # - derive/^r/l/
      # - derive/^g/k/
      # - derive/^k/g/
      # 韵母
      # - derive/ang/an/
      # - derive/an/ang/
      - derive/eng/en/  # en → eng
      - derive/en/eng/  # eng → en
      - derive/in/ing/  # ing → in
      - derive/ing/in/  # in → ing
      # - derive/ian/iang/
      # - derive/iang/ian/
      # - derive/uan/uang/
      # - derive/uang/uan/
      # - derive/ai/an/
      # - derive/an/ai/
      # - derive/ong/un/
      # - derive/un/ong/
      # - derive/ong/on/
      # - derive/iong/un/
      # - derive/un/iong/
      # - derive/ong/eng/
      # - derive/eng/ong/
      # 拼音音节
      # - derive/^fei$/hui/
      # - derive/^hui$/fei/
      # - derive/^hu$/fu/
      # - derive/^fu$/hu/
      # - derive/^wang$/huang/
      # - derive/^huang$/wang/
  
      ### 旧时的拼写规则
      # - derive/un$/uen/
      # - derive/ui$/uei/
      # - derive/iu$/iou/
  
      ### 超级简拼
      - erase/^hm$/ # 响应超级简拼，取消「噷 hm」的独占
      - erase/^m$/  # 响应超级简拼，取消「呣 m」的独占
      - erase/^n$/  # 响应超级简拼，取消「嗯 n」的独占
      - erase/^ng$/ # 响应超级简拼，取消「嗯 ng」的独占
      - abbrev/^([a-z]).+$/$1/   # 超级简拼
      - abbrev/^([zcs]h).+$/$1/  # 超级简拼中，zh ch sh 视为整体（ch'sh → 城市），而不是像这样分开（c'h's'h → 吃好睡好）。
  
      ### v u 转换，增加对词库中「nue/nve」「qu/qv」等不同注音的支持
      - derive/^([nl])ue$/$1ve/
      - derive/^([nl])ve$/$1ue/
      - derive/^([jqxy])u/$1v/
      - derive/^([jqxy])v/$1u/
  
      ### 可输入大写字母，做了 xlit 转写是为了适配双拼
      - xlit/āḃçďēḟḡĥīĵḱĺḿńōṕɋŕśťūṽẃẋȳź/ABCDEFGHIJKLMNOPQRSTUVWXYZ/
  
      ### 自动纠错
      # 有些规则对全拼简拼混输有副作用：如「x'ai 喜爱」被纠错为「xia 下」
      # zh、ch、sh
      - derive/([zcs])h(a|e|i|u|ai|ei|an|en|ou|uo|ua|un|ui|uan|uai|uang|ang|eng|ong)$/h$1$2/  # hzi → zhi
      - derive/([zcs])h([aeiu])$/$1$2h/  # zih → zhi
      # ai
      - derive/^([wghk])ai$/$1ia/  # wia → wai
      # ia
      - derive/([qjx])ia$/$1ai/  # qai → qia
      # ei
      - derive/([wtfghkz])ei$/$1ie/
      # ie
      - derive/([jqx])ie$/$1ei/
      # ao
      - derive/([rtypsdghklzcbnm])ao$/$1oa/
      # ou
      - derive/([ypfm])ou$/$1uo/
      # uo（无）
      # an
      - derive/([wrtypsdfghklzcbnm])an$/$1na/
      # en
      - derive/([wrpsdfghklzcbnm])en$/$1ne/
      # ang
      - derive/([wrtypsdfghklzcbnm])ang$/$1nag/
      - derive/([wrtypsdfghklzcbnm])ang$/$1agn/
      # eng
      - derive/([wrtpsdfghklzcbnm])eng$/$1neg/
      - derive/([wrtpsdfghklzcbnm])eng$/$1egn/
      # ing
      - derive/([qtypdjlxbnm])ing$/$1nig/
      - derive/([qtypdjlxbnm])ing$/$1ign/
      # ong
      - derive/([rtysdghklzcn])ong$/$1nog/
      - derive/([rtysdghklzcn])ong$/$1ogn/
      # iao
      - derive/([qtpdjlxbnm])iao$/$1ioa/
      - derive/([qtpdjlxbnm])iao$/$1oia/
      # ui
      - derive/([rtsghkzc])ui$/$1iu/
      # iu
      - derive/([qjlxnm])iu$/$1ui/
      # ian
      - derive/([qtpdjlxbnm])ian$/$1ain/
      # - derive/([qtpdjlxbnm])ian$/$1ina/ # 和「李娜、蒂娜、缉拿」等常用词有冲突
      # in
      - derive/([qypjlxbnm])in$/$1ni/
      # iang
      - derive/([qjlxn])iang$/$1aing/
      - derive/([qjlxn])iang$/$1inag/
      # ua
      - derive/([g|k|h|zh|sh])ua$/$1au/
      # uai
      - derive/([g|h|k|zh|ch|sh])uai$/$1aui/
      - derive/([g|h|k|zh|ch|sh])uai$/$1uia/
      # uan
      - derive/([qrtysdghjklzxcn])uan$/$1aun/
      # - derive/([qrtysdghjklzxcn])uan$/$1una/ # 和「去哪、露娜」等常用词有冲突
      # un
      - derive/([qrtysdghjklzxc])un$/$1nu/
      # ue
      - derive/([nlyjqx])ue$/$1eu/
      # uang
      - derive/([g|h|k|zh|ch|sh])uang$/$1aung/
      - derive/([g|h|k|zh|ch|sh])uang$/$1uagn/
      - derive/([g|h|k|zh|ch|sh])uang$/$1unag/
      - derive/([g|h|k|zh|ch|sh])uang$/$1augn/
      # iong
      - derive/([jqx])iong$/$1inog/
      - derive/([jqx])iong$/$1oing/
      - derive/([jqx])iong$/$1iogn/
      - derive/([jqx])iong$/$1oign/
      # 其他
      - derive/([rtsdghkzc])o(u|ng)$/$1o/ # do → dou|dong
      - derive/ong$/on/ # lon → long
      - derive/([tl])eng$/$1en/ # ten → teng
      - derive/([qwrtypsdfghjklzxcbnm])([aeio])ng$/$1ng/ # lng → lang、leng、ling、long
```

接下来是设置鼠须管的外观，主要还是macOS的默认输入法用久了，所以还是把外观设成和macOS默认输入法差不多。还是和上面一样，使用nano创建一个设置文件`nano  ~/Library/Rime/squirrel.custom.yaml`，以避免修改原配置文件，方便后续升级输入法的配置

```yaml
# Squirrel Patch settings
# encoding: utf-8
#
# 内置皮肤展示： https://github.com/NavisLab/rime-pifu
# 鼠须管配置指南： https://github.com/LEOYoon-Tsaw/Rime_collections/blob/master/鼠鬚管介面配置指南.md
# 鼠须管作者写的图形化的皮肤设计器： https://github.com/LEOYoon-Tsaw/Squirrel-Designer

patch:
  style:
    color_scheme: macos_light       # 将皮肤名称输入在此处
    color_scheme_dark: macos_dark   # 暗色模式下的皮肤名称

  # 皮肤列表
  preset_color_schemes:
    macos_light:
      name: "MacOS 浅色／MacOS Light"
      author: 小码哥
      font_face: "PingFangSC"          # 字体及大小
      font_point: 16
      label_font_face: "PingFangSC"    # 序号字体及大小
      label_font_point: 12
      comment_font_face: "PingFangSC"  # 注字体及大小
      comment_font_point: 16
      candidate_format: "%c\u2005%@\u2005" # 编号 %c 和候选词 %@ 前后的空间
      candidate_list_layout: linear   # 候选排布：层叠 stacked | 行 linear
      text_orientation: horizontal    # 行文向： 横 horizontal | 纵 vertical
      inline_preedit: true            # 拼音位于： 候选框 false | 行内 true
      translucency: false             # 磨砂： false | true
      mutual_exclusive: false         # 色不叠加： false | true
      border_height: 1                # 外边框 高
      border_width: 1                 # 外边框 宽
      corner_radius: 5                # 外边框 圆角半径
      hilited_corner_radius: 5       # 选中框 圆角半径
      surrounding_extra_expansion: 0 # 候选项背景相对大小？
      shadow_size: 0                 # 阴影大小
      line_spacing: 5                # 行间距
      base_offset: 0                 # 字基高
      alpha: 1                       # 透明度，0~1
      spacing: 10                    # 拼音与候选项之间的距离 （inline_preedit: false）
      color_space: srgb                       # 色彩空间： srgb | display_p3
      back_color: 0xFFFFFF                    # 底色
      hilited_candidate_back_color: 0xD75A00  # 选中底色
      label_color: 0x999999                   # 序号颜色
      hilited_candidate_label_color: 0xFFFFFF # 选中序号颜色
      candidate_text_color: 0x3c3c3c          # 文字颜色
      hilited_candidate_text_color: 0xFFFFFF  # 选中文字颜色
      comment_text_color: 0x999999            # 注颜色
      hilited_comment_text_color: 0xFFFFFF    # 选中注颜色
      text_color: 0x424242                    # 拼音颜色 （inline_preedit: false）
      hilited_text_color: 0xFFFFFF            # 选中拼音颜色 （inline_preedit: false）
      candidate_back_color: 0xe9e9ea          # 候选项底色
      # preedit_back_color:                   # 拼音底色 （inline_preedit: false）
      hilited_back_color: 0xD75A00            # 选中拼音底色 （inline_preedit: false）
      border_color: 0xFFFFFF                  # 外边框颜色

    macos_dark:
      name: "MacOS 深色／MacOS Dark"
      author: 小码哥
      font_face: "PingFangSC"          # 字体及大小
      font_point: 16
      label_font_face: "PingFangSC"    # 序号字体及大小
      label_font_point: 12
      comment_font_face: "PingFangSC"  # 注字体及大小
      comment_font_point: 16
      candidate_format: "%c\u2005%@\u2005" # 编号 %c 和候选词 %@ 前后的空间
      candidate_list_layout: linear   # 候选排布：层叠 stacked | 行 linear
      text_orientation: horizontal    # 行文向： 横 horizontal | 纵 vertical
      inline_preedit: true            # 拼音位于： 候选框 false | 行内 true
      translucency: false             # 磨砂： false | true
      mutual_exclusive: false         # 色不叠加： false | true
      border_height: 1                # 外边框 高
      border_width: 1                 # 外边框 宽
      corner_radius: 5                # 外边框 圆角半径
      hilited_corner_radius: 5       # 选中框 圆角半径
      surrounding_extra_expansion: 0 # 候选项背景相对大小？
      shadow_size: 0                 # 阴影大小
      line_spacing: 5                # 行间距
      base_offset: 0                 # 字基高
      alpha: 1                       # 透明度，0~1
      spacing: 10                    # 拼音与候选项之间的距离 （inline_preedit: false）
      color_space: srgb                       # 色彩空间： srgb | display_p3
      back_color: 0x1f1e2d                  # 底色
      hilited_candidate_back_color: 0xD75A00  # 选中底色
      label_color: 0x999999                   # 序号颜色
      hilited_candidate_label_color: 0xFFFFFF # 选中序号颜色
      candidate_text_color: 0xe9e9ea          # 文字颜色
      hilited_candidate_text_color: 0xFFFFFF  # 选中文字颜色
      comment_text_color: 0x999999            # 注颜色
      hilited_comment_text_color: 0x999999    # 选中注颜色
      text_color: 0x808080                    # 拼音颜色 （inline_preedit: false）
      hilited_text_color: 0xFFFFFF            # 选中拼音颜色 （inline_preedit: false）
      candidate_back_color: 0xe9e9ea          # 候选项底色
      # preedit_back_color:                   # 拼音底色 （inline_preedit: false）
      hilited_back_color: 0xD75A00            # 选中拼音底色 （inline_preedit: false）
      border_color: 0x050505                  # 外边框颜色

    wechat_light:
      name: "微信浅色／Wechat Light"
      author: 小码哥
      font_face: "PingFangSC"          # 字体及大小
      font_point: 16
      label_font_face: "PingFangSC"    # 序号字体及大小
      label_font_point: 13
      comment_font_face: "PingFangSC"  # 注字体及大小
      comment_font_point: 16
      candidate_format: "%c\u2005%@\u2005" # 编号 %c 和候选词 %@ 前后的空间
      candidate_list_layout: linear   # 候选排布：层叠 stacked | 行 linear
      text_orientation: horizontal    # 行文向： 横 horizontal | 纵 vertical
      inline_preedit: true            # 拼音位于： 候选框 false | 行内 true
      translucency: false             # 磨砂： false | true
      mutual_exclusive: false         # 色不叠加： false | true
      border_height: 1                # 外边框 高
      border_width: 1                 # 外边框 宽
      corner_radius: 5                # 外边框 圆角半径
      hilited_corner_radius: 5       # 选中框 圆角半径
      surrounding_extra_expansion: 0 # 候选项背景相对大小？
      shadow_size: 0                 # 阴影大小
      line_spacing: 5                # 行间距
      base_offset: 0                 # 字基高
      alpha: 1                       # 透明度，0~1
      spacing: 10                    # 拼音与候选项之间的距离 （inline_preedit: false）
      color_space: srgb                       # 色彩空间： srgb | display_p3
      back_color: 0xFFFFFF                    # 底色
      hilited_candidate_back_color: 0x79af22  # 选中底色
      label_color: 0x999999                   # 序号颜色
      hilited_candidate_label_color: 0xFFFFFF # 选中序号颜色
      candidate_text_color: 0x3c3c3c          # 文字颜色
      hilited_candidate_text_color: 0xFFFFFF  # 选中文字颜色
      comment_text_color: 0x999999            # 注颜色
      hilited_comment_text_color: 0x999999    # 选中注颜色
      text_color: 0x424242                    # 拼音颜色 （inline_preedit: false）
      hilited_text_color: 0x999999            # 选中拼音颜色 （inline_preedit: false）
      candidate_back_color: 0xe9e9ea          # 候选项底色
      # preedit_back_color:                   # 拼音底色 （inline_preedit: false）
      hilited_back_color: 0x79af22            # 选中拼音底色 （inline_preedit: false）
      border_color: 0xFFFFFF                  # 外边框颜色

    wechat_dark:
      name: "微信深色／Wechat Dark"
      author: 小码哥
      font_face: "PingFangSC"          # 字体及大小
      font_point: 16
      label_font_face: "PingFangSC"    # 序号字体及大小
      label_font_point: 13
      comment_font_face: "PingFangSC"  # 注字体及大小
      comment_font_point: 16
      candidate_format: "%c\u2005%@\u2005" # 编号 %c 和候选词 %@ 前后的空间
      candidate_list_layout: linear   # 候选排布：层叠 stacked | 行 linear
      text_orientation: horizontal    # 行文向： 横 horizontal | 纵 vertical
      inline_preedit: true            # 拼音位于： 候选框 false | 行内 true
      translucency: false             # 磨砂： false | true
      mutual_exclusive: false         # 色不叠加： false | true
      border_height: 1                # 外边框 高
      border_width: 1                 # 外边框 宽
      corner_radius: 5                # 外边框 圆角半径
      hilited_corner_radius: 5       # 选中框 圆角半径
      surrounding_extra_expansion: 0 # 候选项背景相对大小？
      shadow_size: 0                 # 阴影大小
      line_spacing: 5                # 行间距
      base_offset: 0                 # 字基高
      alpha: 1                       # 透明度，0~1
      spacing: 10                    # 拼音与候选项之间的距离 （inline_preedit: false）
      color_space: srgb                       # 色彩空间： srgb | display_p3
      back_color: 0x151515                    # 底色
      hilited_candidate_back_color: 0x79af22  # 选中底色
      label_color: 0x999999                   # 序号颜色
      hilited_candidate_label_color: 0xFFFFFF # 选中序号颜色
      candidate_text_color: 0xbbbbbb          # 文字颜色
      hilited_candidate_text_color: 0xFFFFFF  # 选中文字颜色
      comment_text_color: 0x999999            # 注颜色
      hilited_comment_text_color: 0xFFFFFF    # 选中注颜色
      text_color: 0xbbbbbb                    # 拼音颜色 （inline_preedit: false）
      hilited_text_color: 0x999999            # 选中拼音颜色 （inline_preedit: false）
      candidate_back_color: 0xbbbbbb          # 候选项底色
      # preedit_back_color:                   # 拼音底色 （inline_preedit: false）
      hilited_back_color: 0x79af22            # 选中拼音底色 （inline_preedit: false）
      border_color: 0x292929                  # 外边框颜色      
```

上面的配置文件里还有wechat_light和wechat_dark两个主题，我没有试好不好看好不好用，就先放着后面在折腾吧，反正我也没用过微信输入法，怕被腾讯卖了🤣

最后就是设置同步功能，虽然我现在只有一个Mac，但是万一我那天脑子哪根弦没搭对再买个Mac mini或者studio呢，都不好说是吧。退一步说，设置一下同步功能也算是将词库文件在iCloud备份一下，以后再重新弄rime的时候下载下来就好了。

第一步还是和上面两项一样，用nano文件编辑installation.yaml文件`nano ~/Library/Rime/installation.yaml`，要改的第一个地方就是把`installation_id: `后面的nnid换成自定义的名字，我这里是参考BaiYun大神，设置成了`installation_id: "mbp16"`。第二个要改的就是设置同步路径，也就是把下面`sync_dir: "/Users/YOUR_NAME/Library/Mobile Documents/com~apple~CloudDocs/RimeSync"`粘贴到文件最后，还有就是不要忘了把里面的YOUR_NAME换成你在Mac里面的用户名，要么会报错。

修改完了之后点输入法菜单里面的“同步用户数据”就可以进行同步备份啦，但是自己要记得没事干就同步一次，因为rime本身不带定时同步功能，虽然BaiYun大神写了如何利用sleepwatcher在电脑休眠和唤醒的时候自动触发同步，但是我不太想为了同步一下就装个软件，所以下面我就记录一下做法，但是我自己并没有用：

```shell
# 使用Homebrew安装sleepwatcher
brew install sleepwatcher
# 编辑~/.sleep文件并修改文件权限
touch ~/.sleep
chmod +x ~/.sleep
```

在 ~/.sleep 文件填写下面的内容

```yaml
#!/usr/bin/env bash

# 触发鼠须管同步用户数据
/Library/Input\ Methods/Squirrel.app/Contents/MacOS/Squirrel --sync
```

最后在设置重启sleepwatcher

```shell
brew services restart sleepwatcher
```

当然上面的只是在休眠的时候同步，要设置唤醒的时候同步还需要设置一个~/.wakeup文件，参考上面设置就好。

最后还有配置更新部分，这部分我没有试，所以就直接复制BaiYun大神写的内容就好了：
> 前面我们用的预设配置是 雾凇拼音 这个项目提供的，后续可以通过下面的命令更新配置以获得新功能和 Bugfix。
> 更新雾凇拼音：所有配置和词库（更新前建议先备份 ~/Library/Rime 目录，更新后所有非 .custom.yaml 结尾的配置文件会被覆盖）
> ```shell
> # 先回到 plum 安装目录，如果你将 plum 安装在了其他目录，这里需要修改
> cd ~/plum
> bash rime-install iDvel/rime-ice:others/recipes/full
> ```
> 更新雾凇拼音：所有词库文件
> ```shell
> cd ~/plum
> bash rime-install iDvel/rime-ice:others/recipes/all_dicts
> 如果你用下来感觉挺好的没啥问题，那建议只更新词库就行了。
> 对于自定义的补丁配置文件，尤其是 *.custom.yaml 和自定义字典，建议将其备份到自己的 git 仓库保存，防止配置意外被覆盖或丢失。
> ```

到这里，鼠须管对我来说已经可以替代macOS自带的输入法进行使用了，具体好不好用等我用了一阵之后再反馈吧（如果我还记得的话，哈哈哈哈）