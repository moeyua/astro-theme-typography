---
title: 使用rules_xcodeproj生成Xcode项目
pubDate: 2024-04-20 00:50:23
categories: [编程]
description: '因为在网上没有找到中文版的rules_xcodeproj使用教程，自己就折腾了一下午，趁着还没忘，记录一下使用rules_xcodeproj生成Xcode项目的步骤……'
---

今天在刷B站的时候看到了B站官方写的一个博客，是介绍B站在使用Bazel开发iOS应用时的探索，瞬间就勾起了我的兴趣，虽然我知道切换到Bazel对我的那个小app基本没什么提升，说不定在使用Bazel的时候遇到的坑会更多，毕竟我对Bazel的了解也就是今天看的这些文档，基本就是0基础，但是谁让我喜欢折腾呢。为了防止过一阵子之后就忘了我现在是怎么做的，现在就记录一下使用rules_xcodeproj生成Xcode项目的步骤。

---

首先是在Mac上安装Bazel

根据[[Bazel的官网的安装教程](https://bazel.build/install/os-x?hl=zh-cn)]，官方是建议使用 Bazelisk，但是我还是习惯使用Homebrew

```shell
# 通过 Homegreen 安装 Bazel 软件包，如下所示：
brew install bazel

# 设置完毕！您可以运行以下命令来确认 Bazel 已成功安装：
bazel --version

#安装后，您可以使用以下命令升级到较新版本的 Bazel：
brew upgrade bazel
```

接下来就是创建我们的项目文件夹，同时设置外部依赖项所使用WORKSPACE或者MODULE.bazel文件，因为我们要在WORKSPACE文件中声明所有递归的外部依赖项。这样就会使得WORKSPACE文件变得超级冗长难以维护。所以Bazel官方在bazel 5.0.0版本推出了 Bazel Modules 作为 WORKSPACE 的替代方案。那么这里我们就使用MODULE.bazel文件。

```shell
# 设置项目文件夹，将“my-app”设置为自己的项目名称
mkdir my-app
cd my-app

# 创建MODULE.bazel文件，并使用Xcode打开MODULE.bazel设置外部依赖
touch MODULE.bazel
open -a Xcode MODULE.bazel
```

为了方便我们生成Xcode项目，我们可以在外部依赖中设置rules_xcodeproj以及建立Xcode项目所需的其他几个外部依赖项，在我写这篇博客的时候这些版本号都是最新的，过段时间再用的话就得根据实际情况进行调整了。
```python
bazel_dep(name = "rules_xcodeproj", version = "2.2.0")

bazel_dep(name = "rules_swift_package_manager", version = "0.29.2")

bazel_dep(
    name = "apple_support",
    version = "1.15.1",
    repo_name = "build_bazel_apple_support",
)
bazel_dep(
    name = "rules_apple",
    version = "3.5.1",
    repo_name = "build_bazel_rules_apple",
)
bazel_dep(
    name = "rules_swift",
    version = "1.18.0",
    repo_name = "build_bazel_rules_swift",
)
bazel_dep(
    name = "rules_ios",
    version = "4.4.0",
    repo_name = "build_bazel_rules_ios",
)
```

然后我们需要创建BUILD文件，和上面一样用Xcode打开进行编辑用于告知Bazel项目的结构。
```shell
touch BUILD
open -a Xcode BUILD
```
```python
# 首先是添加应用目标，这里我是用来构建iOS应用，所以使用的是ios_application，要给macOS写应用的话就换成macos_application。
load("@build_bazel_rules_apple//apple:ios.bzl", "ios_application", "ios_unit_test",)

# 这部分里面至少需要设置以下5部分内容：
# bundle_id - 二进制文件的软件包 ID（反向 DNS 路径，后跟应用名称）。
# provisioning_profile - 您的 Apple 开发者帐号中的预配配置文件（如果是针对 iOS 设备进行构建）。
# families（仅限 iOS）- 针对 iPhone 和/或 iPad 构建应用。
# infoplists - 要合并到最终 Info.plist 文件的 .plist 文件列表。
# minimum_os_version - 应用支持的最低 macOS 或 iOS 版本。这可确保 Bazel 使用正确的 API 级别构建应用。
ios_application(
    name = "my-app",
    bundle_id = "com.example.my-app",
    families = [
        "iphone",
        "ipad",
    ],
    infoplists = ["Resources/Info.plist"],
    minimum_os_version = "17.0",
    visibility = ["//visibility:public"],
    deps = [":lib"],
)

# 添加lib目标，项目使用swift编写就添加swift_library，如果你用的是Objective-C就使用objc_library
load("@build_bazel_rules_swift//swift:swift.bzl", "swift_library")

# 这里使用glob函数来引入Sources目录中的所有Swift文件。这样我们就不需要手动添加我们以后创建的新文件了。
swift_library(
    name = "lib",
    srcs = glob(["Sources/*.swift"]),
)

# 添加rules_xcodeproj所需要的规则
load(
    "@rules_xcodeproj//xcodeproj:defs.bzl",
    "top_level_target",
    "xcodeproj",
)
# 记得把里面的my-app换成自己项目的名称
xcodeproj(
    name = "xcodeproj",
    build_mode = "bazel",
    project_name = "my-app",
    tags = ["manual"],
    top_level_targets = [
        ":my-app",
    ],
)

# 还可以设置单元测试和UI测试，比如macos_unit_test、ios_unit_test、ios_ui_test等等，我这里就简单写一个ios_unit_test的示例，和上面一样，记得把my-app换为自己项目的名称
ios_unit_test(
    name = "my-appTests",
    bundle_id = "com.example.my-apptests",
    minimum_os_version = "17.0",
    test_host = ":my-app",
    visibility = ["//visibility:public"],
    deps = [":my-appTestLib"],
)

swift_library(
    name = "my-appTestLib",
    srcs = glob(["test/*.swift"]),
)
```

接下来我们来创建ios_application里面提到的"Resources/Info.plist"

```shell
mkdir Resources
touch Resources/Info.plist
open -a Xcode Resources/Info.plist
```

然后把[[示例Info.plist文件中的内容粘贴到里面](https://github.com/bazelbuild/rules_apple/blob/master/examples/ios/HelloWorldSwift/Info.plist)]

```html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>UILaunchScreen</key>
	<dict>
		<key>UILaunchScreen</key>
		<dict/>
	</dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>en</string>
	<key>CFBundleExecutable</key>
	<string>$(EXECUTABLE_NAME)</string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>$(PRODUCT_NAME)</string>
	<key>CFBundlePackageType</key>
	<string>$(PRODUCT_BUNDLE_PACKAGE_TYPE)</string>
	<key>CFBundleShortVersionString</key>
	<string>1.0</string>
	<key>CFBundleVersion</key>
	<string>1</string>
	<key>LSRequiresIPhoneOS</key>
	<true/>
	<key>UIRequiredDeviceCapabilities</key>
	<array>
		<string>armv7</string>
	</array>
	<key>UISupportedInterfaceOrientations</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
</dict>
</plist>
```

最后就是我们在Sources文件夹里建立一个入口文件

```shell
mkdir Sources
Sources/my-appApp.swift
```
```swift
import SwiftUI

@main
struct my-appApp: App {
    var body: some Scene {
        WindowGroup {
            Text("Hello from Bazel!")
        }
    }
}
```

好了，到这里我们所有的准备工作就做完了，接下来我们来使用rules_xcodeproj来Xcode项目文件
```shell
bazel run //:xcodeproj
```

不出意外地话一个通过rules_xcodeproj和Bazel构建的Xcode项目就出现在你的项目文件夹里了。这个项目可以使用单元测试、SwiftUI Previews等等，基本和通过Xcode建立的项目没有什么区别，但是可以用到Bazel的优秀功能（虽然我现在根本没有感觉到🤣），

睡了睡了，这都凌晨两点了，以后再继续研究吧。