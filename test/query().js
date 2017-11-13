var Uri = require('../uri');
var assert = require('assert');

// 测试query()
describe('query()', function(){
    it('query 测试请求参数', function(){
        var o = new Uri('http://timg01.bdimg.com/timg?pacompress&imgtype=0&sec=1439619614&di=fcaabad6c5b2c213d736a2f063db0902&quality=90&size=b870_10000&src=http://bos.nj.bpc.baidu.com/v1/mediaspot/7edfe5220f393c06c5130736e96226f1.jpeg');
        assert.equal(o.protocol, 'http:');
        assert.equal(o.userinfo, '');
        assert.equal(o.hostname, 'timg01.bdimg.com');
        assert.equal(o.pathname, '/timg');
        // null
        assert.equal(o.query('u'), null);
        assert.equal(o.query('pacompress'), '');
        assert.equal(o.query('imgtype'), '0');
        assert.equal(o.query('sec'), '1439619614');
        assert.equal(o.query('di'), 'fcaabad6c5b2c213d736a2f063db0902');
        assert.equal(o.query('quality'), '90');
        assert.equal(o.query('size'), 'b870_10000');
        assert.equal(o.query('src'), 'http://bos.nj.bpc.baidu.com/v1/mediaspot/7edfe5220f393c06c5130736e96226f1.jpeg');
    });
});