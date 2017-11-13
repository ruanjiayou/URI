var Uri = require('../uri');
var assert = require('assert');

// 测试create()函数
describe('Uri.create()', function(){
    var o = new Uri('http://qiao:123456@jiayou.com/api/v1/info.html?time=123&op=edit#top');
    it('根路径表示', function(){
        var temp = o.create('/admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://qiao:123456@jiayou.com/admin/logo.png?size=1080*720');
    });
    it('当前./路径表示', function(){
        var temp = o.create('./admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://qiao:123456@jiayou.com/api/v1/admin/logo.png?size=1080*720');
    });
    it('当前路径表示(文件夹', function(){
        var temp = o.create('admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://qiao:123456@jiayou.com/api/v1/admin/logo.png?size=1080*720');
    });
    it('当前路径表示(文件', function(){
        var temp = o.create('logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://qiao:123456@jiayou.com/api/v1/logo.png?size=1080*720');
    });
    it('../路径表示', function(){
        var temp = o.create('../admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://qiao:123456@jiayou.com/api/admin/logo.png?size=1080*720');
    });
    it('../路径表示(越界', function(){
        var temp = o.create('../../../admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://qiao:123456@jiayou.com/admin/logo.png?size=1080*720');
    }); 
});
//测试create()函数 页面路径是特殊的php路由
describe('Uri.create() 页面路径是特殊的php路由', function(){
    var o = new Uri('http://php.blog.jiayou.com/index.php/index/985.html');
    it('根路径表示', function(){
        var temp = o.create('/admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://php.blog.jiayou.com/admin/logo.png?size=1080*720');
    });
    it('当前./路径表示', function(){
        var temp = o.create('./admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://php.blog.jiayou.com/index.php/index/admin/logo.png?size=1080*720');
    });
    it('当前路径表示(文件夹', function(){
        var temp = o.create('admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://php.blog.jiayou.com/index.php/index/admin/logo.png?size=1080*720');
    });
    it('当前路径表示(文件', function(){
        var temp = o.create('logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://php.blog.jiayou.com/index.php/index/logo.png?size=1080*720');
    });
    it('../路径表示', function(){
        var temp = o.create('../admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://php.blog.jiayou.com/index.php/admin/logo.png?size=1080*720');
    });
    it('../路径表示(越界', function(){
        var temp = o.create('../../../admin/logo.png?size=1080*720');
        assert.equal(temp.toString(), 'http://php.blog.jiayou.com/admin/logo.png?size=1080*720');
    });
});