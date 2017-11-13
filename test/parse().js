var Uri = require('../uri');
var assert = require('assert');

// 测试parse()函数
describe('Uri.parse()', function(){
    it('parse http', function(){
        var uri_http = new Uri('http://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
        assert.equal(uri_http.protocol, 'http:');
        assert.equal(uri_http.username, 'ruanjiayou');
        assert.equal(uri_http.password, '123456');
        assert.equal(uri_http.hostname, 'jiayou.com');
        assert.equal(uri_http.port, '8080');
        assert.equal(uri_http.pathname, '/admin/index.html');
        assert.equal(uri_http.hash, '#top');
        assert.equal(uri_http.search, '?time=3333&redirect=/');
    });
    it('parse https', function(){
        var uri_https = new Uri('https://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
        assert.equal(uri_https.protocol, 'https:');
        assert.equal(uri_https.username, 'ruanjiayou');
        assert.equal(uri_https.password, '123456');
        assert.equal(uri_https.hostname, 'jiayou.com');
        assert.equal(uri_https.port, '8080');
        assert.equal(uri_https.pathname, '/admin/index.html');
        assert.equal(uri_https.hash, '#top');
        assert.equal(uri_https.search, '?time=3333&redirect=/');
    });
    it('parse ftp', function(){
        var uri_ftp = new Uri('ftp://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
        assert.equal(uri_ftp.protocol, 'ftp:');
        assert.equal(uri_ftp.username, 'ruanjiayou');
        assert.equal(uri_ftp.password, '123456');
        assert.equal(uri_ftp.hostname, 'jiayou.com');
        assert.equal(uri_ftp.port, '8080');
        assert.equal(uri_ftp.pathname, '/admin/index.html');
        assert.equal(uri_ftp.hash, '#top');
        assert.equal(uri_ftp.search, '?time=3333&redirect=/');
    });
    it('parse javascript', function(){
        var uri_javascript = new Uri('javascript:void(0);');
        assert.equal(uri_javascript.protocol, 'javascript:');
        assert.equal(uri_javascript.other, 'void(0);');
    });
    it('parse mailto', function(){
        var uri_mailto = new Uri('mailto:1439120442@jiayou.com');
        assert.equal(uri_mailto.protocol, 'mailto:');
        assert.equal(uri_mailto.username, '1439120442');
        assert.equal(uri_mailto.hostname, 'jiayou.com');
    });
    it('parse tel', function(){
        var uri_tel = new Uri('tel:18972376482');
        assert.equal(uri_tel.protocol, 'tel:');
        assert.equal(uri_tel.other, '18972376482');
    });
    it('parse escape http', function(){
        var uri_escape = new Uri('http%3A%2F%2Fbos.nj.bpc.baidu.com%2Fv1%2Fmediaspot%2F8f805d073b9fc28374d34c25adca5220.jpeg');
        assert.equal(uri_escape.protocol, 'http:');
        assert.equal(uri_escape.username, '');
        assert.equal(uri_escape.password, '');
        assert.equal(uri_escape.hostname, 'bos.nj.bpc.baidu.com');
        assert.equal(uri_escape.port, '');
        assert.equal(uri_escape.pathname, '/v1/mediaspot/8f805d073b9fc28374d34c25adca5220.jpeg');
        assert.equal(uri_escape.search, '');
        assert.equal(uri_escape.hash, '');
        assert.equal(uri_escape.other, '');
    });
    it('parse 中文http', function(){
        var uri_zhcn = new Uri('http://bos.nj.bpc.baidu.com/v1/[破晓电影]/8f805d073b9fc28374d34c25adca5220.jpeg');
        assert.equal(uri_zhcn.protocol, 'http:');
        assert.equal(uri_zhcn.username, '');
        assert.equal(uri_zhcn.password, '');
        assert.equal(uri_zhcn.hostname, 'bos.nj.bpc.baidu.com');
        assert.equal(uri_zhcn.port, '');
        assert.equal(uri_zhcn.pathname, '/v1/[破晓电影]/8f805d073b9fc28374d34c25adca5220.jpeg');
        assert.equal(uri_zhcn.search, '');
        assert.equal(uri_zhcn.hash, '');
        assert.equal(uri_zhcn.other, '');
    });
    it('parse php特殊uri', function(){
        var o = new Uri('http://php.blog.jiayou.com/index.php/index/article1/id/985.html');
        assert.equal(o.protocol, 'http:');
        assert.equal(o.username, '');
        assert.equal(o.password, '');
        assert.equal(o.hostname, 'php.blog.jiayou.com');
        assert.equal(o.port, '');
        assert.equal(o.pathname, '/index.php/index/article1/id/985.html');
        assert.equal(o.search, '');
        assert.equal(o.hash, '');
        assert.equal(o.other, '');
    });
});