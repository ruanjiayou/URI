var Uri = require('../uri');
var assert = require('assert');

// 测试ToString()函数
describe('Uri.toString()', function(){
    it('http->', function(){
        var uri_http = new Uri('http://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
        assert.equal(uri_http.toString(), 'http://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
    });
    it('https->', function(){
        var uri_https = new Uri('https://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
        assert.equal(uri_https.toString(), 'https://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
    });
    it('ftp->', function(){
        var uri_ftp = new Uri('ftp://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
        assert.equal(uri_ftp.toString(), 'ftp://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top');
    });
    it('javascript->', function(){
        var uri_javascript = new Uri('javascript:void(0);');
        assert.equal(uri_javascript.toString(), 'javascript:void(0);');
    });
    it('mailto->', function(){
        var uri_mailto = new Uri('mailto:1439120442@jiayou.com');
        assert.equal(uri_mailto.toString(), 'mailto:1439120442@jiayou.com');
    });
    it('tel->', function(){
        var uri_tel = new Uri('tel:18972376482');
        assert.equal(uri_tel.toString(), 'tel:18972376482');
    });
});