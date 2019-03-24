# 设计说明
[![Build Status](https://travis-ci.org/ruanjiayou/URI.svg)](https://travis-ci.org/ruanjiayou/URI)
[![Coverage Status](https://coveralls.io/repos/github/ruanjiayou/URI/badge.svg?branch=master)](https://coveralls.io/github/ruanjiayou/URI?branch=master)
[![](https://img.shields.io/npm/dm/uri-parser-helper.svg)](https://www.npmjs.com/package/uri-parser-helper)

```
解析HTML中的URI，包括  ftp: malto: tel: http: https: // javascript: 等协议
```
---
- **成员变量**
- *protocol* 协议(冒号:结尾)
- *username* 用户名
- *password* 密码
- *hostname* 主机名 域名/IP
- *port* 端口
- *pathname* 相对根目录
- *hash* 锚点
- *search* 请求参数
- [getter]*auth* 用户信息
- [getter]*origin* 站点
- [getter]*host* 域名+端口
- [getter]*path* 路径
- [getter]*href* 链接地址 protocol + // host + path + hash 
---
- **成员方法**
- *parse()* 对象初始化时将字符串解析为URI对象
- *toString()* 
- *format()* 格式化URI格式的JSON对象
- *create()* 依据当前URI对象，把字符串解析新的URI对象
- *shortOf()* 相对目标页的路径
- query() 获取请求参数
- ext() 获取url拓展名
- ~~*isPaging()* 判断是否是分页~~
- match() 仿express路由匹配,并返回k-v对象,不用每次都写正则了~~
---
### 更新日志
```
/**
作者：阮家友
时间：2017-5-5 10:02:27
说明：1.网站的默认文档
      2.路由控制造成的 path后面的/要不要？ path == path/
      3.path等于paths join('/') 
      4.Uri不传uri参数 uri就是undefined不是null
      5.不考虑非法字符 最大数量等方面 如非出现错误否则不再优化
      6.2017-5-7 13:13:18
      2017-5-11 20:38:45 查看了html中的location对象
        protocol/hostname/pathname/port/search/hash href/origin
      2017-5-12 09:40:15 
        不同地方取名都不一样 最好是成员名称映射+get() set()
        Path和url的解析不应该糅合在一起的 浪费了大量的时间 反而走错了方向
      7.javascript协议 IPv6没考虑到 
        file协议也可以有host // \\
        maito有query 固定的？
        http中host之前还可以有user:info@这种东西
        uri.create(uri) 和 new Uri(base,uri)
      2017-5-14 15:44:48
        Uri对象
            FTP http https malto 使用正常模式  ***://
            javascript tel 自定义 ***:
            original
            protocol
            username
            password
            host
            port
            path
            file
            hash
            query 
            isOther
            isRelative
            base Uri
        本地文件file协议使用 Path对象
      2017-5-24 17:27:24
        发现破晓网下载电影时 ftp带有username和password
      2017-5-25 14:25:57
        # parse时被识别为path
        url(base, relative)时 relative还可能为 javascript:; 所以如果检测到protocol就直接返回new Uri(relative)
      2017-5-25 23:50:12
        增加Q成员 放请求参数对象 {}
      2017-8-27 15:53:04
        eslint过了一遍
        //TODO 
        不改了× username改为user，password改为info 
        √ query改为search 原先的getQ改为query方法，
        √ 去掉base Uri，
        √ 去掉isRelative
        加上polyfill减少代码量
        √ 增加has方法判断是否有key
        改为create × convertToAbsolute去掉 有toString就够了
        改为 extension × getExtension用getter代替
        √ toRelativeString改为toShort
        改完的放到GitHub中
      2017-8-27 16:02:32
          由util中的修改生成的版本
      2017-9-3 15:36:21
        url被编码了出错！  还是unescape一下
        new时是相对路径 没有origin问题很大
      2017-9-10 22:08:24
        https://segmentfault.com/img/remote/1460000009042584?w=644&h=569
      2017-9-12 10:58:49
        根据nodejs的url模块修改
        *origin：protocol+host+port
        protocol：浏览器中是http: 后面竟然加了冒号~~
        username：
        password：
        *auth：username+password 有的叫auth有的叫userinfo
        host：hostname+port
        hostname：
        port：
        search：
        hash：
        pathname：dir+file
        *dir： 统一都/开头
        *file：
        query()
        toString()
        create()
        toShortOf(dist)
      2017-11-6 00:50:43
          添加mocha单元测试
      2017-11-6 01:34:01
          测试VS code中使用git。。
      2017-11-12 22:15:33
          添加测试用例
      2017-11-13 17:16:23
          补充单元测试用例
      2017-11-15 15:19:23
          发布到npm
      2017-12-17 16:15:08
          search字符串的处理:设置/获取key(key可能有多个,例如:type=a&type=b.服务器取到的是type=['a','b']) 
          encodeURI()
          该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。

      该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：;/?:@&=+$,#
      2017-12-30 20:42:46
        对查询字符串的处理:偷懒用qs模块~~~
      2018-1-14 16:28:53
        增加match()方法和测试
      2018-1-14 20:07:44
        uri.js上次竟然没发布成功
**/
```

---
### 使用方法
解析一个正常的网址(依赖qs模块)
```
var Uri = require('uri-parser-helper');
var uri1 = new Uri('http://ruan:123456@jiayou.com:8080/admin/cate/index.html?time=48524124&token=ds45d45d124d542d#top');
var uri2 = new Uri().parse('http://www.baidu.com');
var uri3 = uri2.creat('/images/2017-11/default.png');
var uri4 = uri3.shortOf(uri2);
var uri5 = new Uri().format({
    protocol: 'http:',
    username: 'ruanjiayou',
    password: '123456',
    hostname: 'jiayou.com',
    port: '8080',
    pathname: '/admin/index.html',
    hash: '#top',
    search: '?time=3333'
});
var url  = uri4.toString();

// 协议名称 http:
console.log(uri1.protocol);
// 用户名 ruan
console.log(uri1.username);
// 用户密码 123456
console.log(uri1.password);
// 主机名 iayou.com (可以是ip的形式 192.168.1.1)
console.log(uri1.hostname);
// 端口 8080
console.log(uri1.port);
// 路径 /admin/cate/index.html
console.log(uri1.pathname);
// 查询参数 ?time=48524124&token=ds45d45d124d542d
console.log(uri1.search);
// 锚点 #top
console.log(uri1.hash);
// 获取指定的查询参数值
console.log(uri1.query('time'));
```
```
git地址： https://github.com/ruanjiayou/URI
安装方法： npm install uri-parser-helper --save-dev
```
