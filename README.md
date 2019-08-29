# vue_networking

> A Vue.js project

## 说明

真实的面向生产项目，不对外开放，只对购买了门票的参会人员开放。**如被告知需要删除会及时删除**

为辅助会议期间为参会嘉宾提供更好的服务所开发，使用技术站为 `vue`，`vue-router`，`vuex`。用户可以查看日程，日程详情，嘉宾列表，嘉宾详情，可以邀约嘉宾进行商务洽谈合作，和嘉宾聊天，赞助商列表，赞助商详情，广场需求帖子，搜索嘉宾和赞助商功能，同时为了考虑外国用户增加了国际化中英文切换。

## 目录结构

```
    vue_networking
        public
        screenshots                         // 运行截图
        src
            assets                          // 一些图片
            components                      // 组件
            lang                            // 国际化切换需要的语言包
            plugins                         // 没用上，用浏览器原生弹窗
            store                           // vuex状态容器
            views                           // 视图页面
            App.vue
            main.js
            router.js                       // 路由
            utils.js
        .broserslistrc
        .gitignore
        .babel.config.js
        package.json
        ...
```

## 实现的页面或功能

+ 登录页
+ 首页（日程页）
+ 日程详情页（查看详情，订阅日程提醒）
+ 演讲嘉宾详情页
+ 人脉（全部参会嘉宾，实现滚动分页加载）
+ 推荐嘉宾（可以根据筛选标签精准推荐，实现滚动分页加载）
+ 参会嘉宾详情页（可以邀约嘉宾，和嘉宾聊天）
+ 邀约嘉宾（进行商务洽谈）
+ 广场页（全部赞助商，实现滚动分页加载，广场需求帖子）
+ 赞助商详情（查看赞助商，可以联系赞助商进行商务合作）
+ 发布页（发布供应或需求帖子至广场）
+ 消息列表页
+ 聊天页（和参会嘉宾聊天，发送名片）
+ 我的（进行中英文切换）
+ 个人资料页（修改头像，简介等个人信息）
+ 搜索页
+ 搜索结果页

## 截图（中文）

![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/1_1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/2.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/2_1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/3.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/3_2.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/4.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/4_1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/4_2.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/4_3.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/5.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/5_1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/5_2.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/5_3.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/6.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/cn/6_1.png)

## 截图（英文）

![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/1_1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/2.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/2_1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/3.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/3_1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/3_2.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/3_3.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/4.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/4_1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/4_2.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/4_3.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/5.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/5_1.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/5_2.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/6.png)
![](https://github.com/fuchen92/vuecli3_networking/blob/master/screenshots/en/6_1.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
