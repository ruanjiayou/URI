var Uri = require('../uri');
var assert = require('assert');

// 测试parse()函数
describe('Uri.parse()', function () {
    it('parse http', function () {
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
    it('parse https', function () {
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
    it('test querystring', function () {
        var uri1 = new Uri('http://jiayou.com/?s=1&s=2');
        var uri2 = new Uri('http://jiayou.com/?s[]=1&s[]=2');
        var uri3 = new Uri('http://jiayou.com/?s[1]=1&s[2]=2');
        var uri4 = new Uri('http://jiayou.com/?s[2]=1&s[1]=2');
        var uri5 = new Uri('http://jiayou.com/?s[s1]=1&s[]=2');
        var uri6 = new Uri('http://jiayou.com/?s[s1]=1&s[2]=2');
        assert.deepEqual(uri1._search, { s: ['1', '2'] });
        assert.deepEqual(uri2._search, { 's': ['1', '2'] });
        assert.deepEqual(uri3._search, { 's': ['1', '2'] });
        assert.deepEqual(uri4._search, { s: ['2', '1'] });
        assert.deepEqual(uri5._search, { s: { s1: '1', '0': '2' } });
        assert.deepEqual(uri6._search, { s: { s1: '1', '2': '2' } });

        assert.equal(uri1.search, '?s[0]=1&s[1]=2');
        assert.equal(uri2.search, '?s[0]=1&s[1]=2');
        assert.equal(uri3.search, '?s[0]=1&s[1]=2');
        assert.equal(uri4.search, '?s[0]=2&s[1]=1');
        assert.equal(uri5.search, '?s[0]=2&s[s1]=1');
        assert.equal(uri6.search, '?s[2]=2&s[s1]=1');
    });
    it('parse ftp', function () {
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
    it('parse javascript', function () {
        var uri_javascript = new Uri('javascript:void(0);');
        assert.equal(uri_javascript.protocol, 'javascript:');
        assert.equal(uri_javascript.other, 'void(0);');
    });
    it('parse mailto', function () {
        var uri_mailto = new Uri('mailto:1439120442@jiayou.com');
        assert.equal(uri_mailto.protocol, 'mailto:');
        assert.equal(uri_mailto.username, '1439120442');
        assert.equal(uri_mailto.hostname, 'jiayou.com');
    });
    it('parse tel', function () {
        var uri_tel = new Uri('tel:18972376482');
        assert.equal(uri_tel.protocol, 'tel:');
        assert.equal(uri_tel.other, '18972376482');
    });
    it('parse escape http', function () {
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
    it('parse 中文http', function () {
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
    it('parse php特殊uri', function () {
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
    it('parse http strict-pathname', function () {
        var o1 = new Uri('http://www.jiayou.com');
        var o2 = new Uri('http://www.jiayou.com/');
        assert.equal(o1.pathname, '/');
        assert.equal(o2.pathname, '/');
    });
    it('parse http strict-hash', function () {
        var o1 = new Uri('http://www.jiayou.com/#top');
        var o2 = new Uri('http://www.jiayou.com/##top');
        assert.equal(o1.hash, '#top');
        assert.equal(o2.hash, '##top');
    });
    it('parse //开头的', function () {
        var o = new Uri('//upload-images.jianshu.io/upload_images/1908904-1cc78e4125891a10.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240');
        assert.equal(o.protocol, 'http:');
    });
    it('parse magnet', function () {
        var o = new Uri('magnet:?xt=urn:btih:AC7E66737FD707F26FA5619AC4F0CA2C591E85AB');
        assert.equal(o.protocol, 'magnet:');
        assert.equal(o.other, '?xt=urn:btih:AC7E66737FD707F26FA5619AC4F0CA2C591E85AB');
    });
    it('parse ip', function () {
        var o = new Uri('http://192.168.1.11:80');
        assert.equal(o.protocol, 'http:');
        assert.equal(o.hostname, '192.168.1.11');
        assert.equal(o.port, '80');
    });
    it('parse !origin', function () {
        var o = new Uri('http://www.jiayou.com:9010/test.jpeg!origin');
        assert.equal(o.pathname, '/test.jpeg!origin');
    });
    it('parse 前后有空格', function () {
        var o = new Uri(' http://www.jiayou.com/test ');
        assert.equal(o.protocol, 'http:');
        assert.equal(o.pathname, '/test');
    });
    it('setter search', function () {
        var o = new Uri('http://www.jiayou.com/test?limit=1&page=1');
        o.search = {
            md5: 1
        };
        assert.equal(o.search, '?limit=1&page=1&md5=1');
        o.search = {
            md5: null,
            page: undefined
        };
        assert.equal(o.search, '?limit=1&md5=');
    });
});