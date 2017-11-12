var Uri = require('../uri');
var assert = require('assert');

var uri_http = new Uri('http://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
var uri_https = new Uri('https://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
var uri_ftp = new Uri('ftp://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
var uri_javascript = new Uri('javascript:void(0);');
var uri_mailto = new Uri('mailto:1439120442@jiayou.com');
var uri_tel = new Uri('tel:18972376482');
var json_http = {
    protocol: 'http:',
    username: 'ruanjiayou',
    password: '123456',
    hostname: 'jiayou.com',
    port: '8080',
    pathname: '/admin/index.html',
    hash: '#top',
    search: '?time=3333'
};
var json_https = {
    protocol: 'https:',
    username: 'ruanjiayou',
    password: '123456',
    hostname: 'jiayou.com',
    port: '8080',
    pathname: '/admin/index.html',
    hash: '#top',
    search: '?time=3333'
};
var json_ftp = {
    protocol: 'ftp:',
    username: 'ruanjiayou',
    password: '123456',
    hostname: 'jiayou.com',
    port: '8080',
    pathname: '/admin/index.html',
    hash: '#top',
    search: '?time=3333'
};
var json_mailto = {
    protocol: 'mailto:',
    username: 'ruanjiayou',
    password: '123456',
    hostname: 'jiayou.com',
    port: '8080',
    pathname: '/admin/index.html',
    hash: '#top',
    search: '?time=3333'
};
var json_tel = {
    protocol: 'tel:',
    other: '18972376482'
};
var json_javascript = {
    protocol: 'javascript:',
    other: 'void(0);'
};
// 测试parse()函数
describe('Uri.parse()', function(){
    it('http:', function(){
        assert.equal(uri_http.protocol, 'http:');
        assert.equal(uri_http.username, 'ruanjiayou');
        assert.equal(uri_http.password, '123456');
        assert.equal(uri_http.hostname, 'jiayou.com');
        assert.equal(uri_http.port, '8080');
        assert.equal(uri_http.pathname, '/admin/index.html');
        assert.equal(uri_http.hash, '#top');
        assert.equal(uri_http.search, '?time=3333&redirect=/');
    });
    it('https:', function(){
        assert.equal(uri_https.protocol, 'https:');
        assert.equal(uri_https.username, 'ruanjiayou');
        assert.equal(uri_https.password, '123456');
        assert.equal(uri_https.hostname, 'jiayou.com');
        assert.equal(uri_https.port, '8080');
        assert.equal(uri_https.pathname, '/admin/index.html');
        assert.equal(uri_https.hash, '#top');
        assert.equal(uri_https.search, '?time=3333&redirect=/');
    });
    it('ftp:', function(){
        assert.equal(uri_ftp.protocol, 'ftp:');
        assert.equal(uri_ftp.username, 'ruanjiayou');
        assert.equal(uri_ftp.password, '123456');
        assert.equal(uri_ftp.hostname, 'jiayou.com');
        assert.equal(uri_ftp.port, '8080');
        assert.equal(uri_ftp.pathname, '/admin/index.html');
        assert.equal(uri_ftp.hash, '#top');
        assert.equal(uri_ftp.search, '?time=3333&redirect=/');
    });
    it('javascript:', function(){
        assert.equal(uri_javascript.protocol, 'javascript:');
        assert.equal(uri_javascript.other, 'void(0);');
    });
    it('mailto:', function(){
        assert.equal(uri_mailto.protocol, 'mailto:');
        assert.equal(uri_mailto.username, '1439120442');
        assert.equal(uri_mailto.hostname, 'jiayou.com');
    });
    it('tel', function(){
        assert.equal(uri_tel.protocol, 'tel:');
        assert.equal(uri_tel.other, '18972376482');
    });
});
// 测试format()函数
describe('Uri.format()', function(){
    it('http {}', function(){
        var o = new Uri().format(json_http);
        assert.equal(o.protocol, 'http:');
        assert.equal(o.username, 'ruanjiayou');
        assert.equal(o.password, '123456');
        assert.equal(o.hostname, 'jiayou.com');
        assert.equal(o.port, '8080');
        assert.equal(o.pathname, '/admin/index.html');
        assert.equal(o.hash, '#top');
        assert.equal(o.search, '?time=3333');
        assert.equal(o.other, '');
    });
    it('https {}', function(){
        var o = new Uri().format(json_https);
        assert.equal(o.protocol, 'https:');
        assert.equal(o.username, 'ruanjiayou');
        assert.equal(o.password, '123456');
        assert.equal(o.hostname, 'jiayou.com');
        assert.equal(o.port, '8080');
        assert.equal(o.pathname, '/admin/index.html');
        assert.equal(o.hash, '#top');
        assert.equal(o.search, '?time=3333');
        assert.equal(o.other, '');
    });
    it('ftp {}', function(){
        var o = new Uri().format(json_ftp);
        assert.equal(o.protocol, 'ftp:');
        assert.equal(o.username, 'ruanjiayou');
        assert.equal(o.password, '123456');
        assert.equal(o.hostname, 'jiayou.com');
        assert.equal(o.port, '8080');
        assert.equal(o.pathname, '/admin/index.html');
        assert.equal(o.hash, '#top');
        assert.equal(o.search, '?time=3333');
        assert.equal(o.other, '');
    });
    it('mailto {}', function(){
        var o = new Uri().format(json_mailto);
        assert.equal(o.protocol, 'mailto:');
        assert.equal(o.username, 'ruanjiayou');
        assert.equal(o.password, '123456');
        assert.equal(o.hostname, 'jiayou.com');
        assert.equal(o.port, '8080');
        assert.equal(o.pathname, '/admin/index.html');
        assert.equal(o.hash, '#top');
        assert.equal(o.search, '?time=3333');
        assert.equal(o.other, '');
    });
    it('tel {}', function(){
        var o = new Uri().format(json_tel);
        assert.equal(o.protocol, 'tel:');
        assert.equal(o.other, '18972376482');
    });
    it('javascript {}', function(){
        var o = new Uri().format(json_javascript);
        assert.equal(o.protocol, 'javascript:');
        assert.equal(o.username, '');
        assert.equal(o.password, '');
        assert.equal(o.hostname, '');
        assert.equal(o.port, '');
        assert.equal(o.pathname, '');
        assert.equal(o.hash, '');
        //assert.equal(o.query.time, '');
        assert.equal(o.other, 'void(0);');
    });
});
// 测试ToString()函数
describe('Uri.toString()', function(){
    it('http->', function(){
        assert(uri_http.toString(), 'http://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
    });
    it('https->', function(){
        assert(uri_https.toString(), 'https://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
    });
    it('ftp->', function(){
        assert(uri_ftp.toString(), 'ftp://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
    });
    it('javascript->', function(){
        assert(uri_javascript.toString(), 'javascript:void(0);');
    });
    it('mailto->', function(){
        assert(uri_mailto.toString(), 'mailto:1439120442@jiayou.com');
    });
    it('tel->', function(){
        assert(uri_tel.toString(), 'tel:18972376482');
    });
});