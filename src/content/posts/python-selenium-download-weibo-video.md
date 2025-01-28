---
title: "Python+Selenium 下载微博视频"
pubDate: 2020-01-02 21:25 PST
categories: ["聊聊技术"]
tags: Python, Reddit, Weibo, Selenium, Data Crawler, 爬虫, 微博
heroImage: /images/blog/python-spider-scaled.jpg
heroImageDescription: Photo by Stem List on Unsplash
---

都2020年了，还写爬虫类型的代码，颇有种49年入国军的感觉，但代码都已经写了，同时这个博客的定位是个人知识库，简单记录下来，万一以后有用呢。

[之前说过](https://old-panda.com/posts/python-video-thumbnail/)，为了在 Reddit 上混几个积分，写了个自动发帖辅助工具，每天发一则熊猫视频，是为“一天一熊猫，忧愁远离我”，比如说这个[帖子](https://www.reddit.com/r/panda/comments/ehwust/a_panda_a_day_keeps_the_sorrow_away/)，成功吸引了大量熊猫粉的观看和点赞。每个帖子我都会注明视频来源，也就是微博。为了练习用 Selenium 扒视频，我写了这样一个简单的函数来找出视频的真正链接

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
HEADERS = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    "referer": "https://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=https%3A%2F%2Fweibo.com%2Ftv%2Fv%2FI9cdSBVBP&domain=.weibo.com&ua=php-sso_sdk_client-0.6.28&_rand=1569807841.8018"
}
def parse_weibo_video(url):
    option = webdriver.ChromeOptions()
    option.add_argument('headless')
    driver = webdriver.Chrome(executable_path="/path/to/chromedriver", chrome_options=option)
    driver.get(url)
    try:
        element = WebDriverWait(driver, 60).until(
            EC.presence_of_element_located((By.TAG_NAME, "video"))
        )
        user = WebDriverWait(driver, 60).until(
            EC.presence_of_element_located((By.XPATH, "//div[@class='player_info']//div[@class='clearfix']/a/span"))
        )
        return element.get_property("src"), user.text
    finally:
        driver.quit()
```

这里的参数 `url` 就是微博视频的网页的链接，比如说 `https://www.weibo.com/tv/v/In7Oce2uO` ，代码中使用 Chrome [无头浏览器](https://en.wikipedia.org/wiki/Headless_browser)来模拟正常用户浏览页面时的加载过程。下面这句代码是获取视频链接的核心

```python
element = WebDriverWait(driver, 60).until(
            EC.presence_of_element_located((By.TAG_NAME, "video"))
        )
```

这是告诉 Selenium driver 等待页面中 html `video` 标签的出现，60秒后超时（限于国外的网络条件，访问国内的网站有时候等得挺久的），这样我们在视频标签出现之后，直接返回其 `src` 的值，即为视频链接，然后就可以为所欲为了。
