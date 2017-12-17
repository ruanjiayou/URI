# 设计说明
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
- ~~*isPaging()* 判断是否是分页~~
---
### 更新日志
```
2017-8-27 16:02:32
    由util中的修改生成的版本
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
```
---
### 使用方法
解析一个正常的网址
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