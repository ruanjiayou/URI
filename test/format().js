var Uri = require('../uri');
var assert = require('assert');

// 测试format()函数
describe('Uri.format()', function(){
    it('http {}', function(){
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
        var json_tel = {
            protocol: 'tel:',
            other: '18972376482'
        };
        var o = new Uri().format(json_tel);
        assert.equal(o.protocol, 'tel:');
        assert.equal(o.other, '18972376482');
    });
    it('javascript {}', function(){
        var json_javascript = {
            protocol: 'javascript:',
            other: 'void(0);'
        };
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