var Uri = require('../uri');
var assert = require('assert');

// 测试ext()函数
describe('Uri.ext()', function(){
    it('test', function(){
        assert.equal(new Uri('http://qiao:123456@jiayou.com/api/v1/info.html?time=123&op=edit#top').ext(), 'html');
        assert.equal(new Uri('http://qiao:123456@jiayou.com/api/v1/.html?time=123&op=edit#top').ext(), 'html');
        assert.equal(new Uri('http://qiao:123456@jiayou.com/api/v1/1.?time=123&op=edit#top').ext(), '');
        assert.equal(new Uri('http://qiao:123456@jiayou.com/api/v1/1.HTM?time=123&op=edit#top').ext(), 'htm');
        assert.equal(new Uri('http://qiao:123456@jiayou.com/api/v1/89757?time=123&op=edit#top').ext(), '');
    });
});