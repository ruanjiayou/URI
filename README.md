# 设计说明
> 解析HTML中的URI，包括 [href][src][] ftp: malto: tel: http: https: // javascript: / 其他
- **成员变量**
- [getter]*origin* 站点
- *protocol* 协议(冒号:结尾)
- *username* 用户名
- *password* 密码
- [getter]*auth* 用户信息
- *host* 域名+端口
- *port* 端口
- [getter]*hostname* 主机名 域名/IP
- *hash* 锚点
- [getter]*search* 请求参数
- *query* 参数
- *pathname* 相对根目录
- [getter]*path* 路径
- [getter]*href* 链接地址 protocol + // host + path + hash 
- **成员方法**
- *parse* 对象初始化时将字符串解析为URI对象
- *toString* 
- *format* 格式化URI格式的JSON对象
- *create* 依据当前URI对象，把字符串解析新的URI对象
- *query* 获取请求参数
- *isPaging* 判断是否是分页
2017-8-27 16:02:32
    由util中的修改生成的版本
2017-11-6 00:50:43
    添加mocha单元测试