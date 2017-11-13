var Uri = require('../uri');
var assert = require('assert');

// 测试shortOf()
describe('Uri.shortOf()', function(){
    var obase = new Uri('http://qiao:123456@jiayou.com/admin/tag/index.html');
    it('子级文件夹', function(){
        var o = new Uri('http://qiao:123456@jiayou.com/admin/tag/images/logo.png?type=huawei&size=1080*720#top');
        assert.equal(o.shortOf(obase), 'images/logo.png?type=huawei&size=1080*720#top');
    });
    it('同级文件夹', function(){
        var o = new Uri('http://qiao:123456@jiayou.com/admin/tag/logo.png?type=huawei&size=1080*720#top');
        assert.equal(o.shortOf(obase), 'logo.png?type=huawei&size=1080*720#top');
    });
    it('父级文件夹', function(){
        var o = new Uri('http://qiao:123456@jiayou.com/admin/logo.png?type=huawei&size=1080*720#top');
        assert.equal(o.shortOf(obase), '../logo.png?type=huawei&size=1080*720#top');
    });
    it('父级同级子文件夹', function(){
        var o = new Uri('http://qiao:123456@jiayou.com/admin/cate/logo.png?type=huawei&size=1080*720#top');
        assert.equal(o.shortOf(obase), '../cate/logo.png?type=huawei&size=1080*720#top');
    });
});
//测试shortOf()函数 页面路径是特殊的php路由
describe('Uri.shortOf() 页面路径是特殊的php路由', function(){
    var obase = new Uri('http://php.blog.jiayou.com/index.php/index/985.html');
    it('子级文件夹', function(){
        var o = new Uri('http://qiao:123456@jiayou.com/index.php/index/images/logo.png?type=huawei&size=1080*720#top');
        assert.equal(o.shortOf(obase), 'images/logo.png?type=huawei&size=1080*720#top');
    });
    it('同级文件夹', function(){
        var o = new Uri('http://qiao:123456@jiayou.com/index.php/index/logo.png?type=huawei&size=1080*720#top');
        assert.equal(o.shortOf(obase), 'logo.png?type=huawei&size=1080*720#top');
    });
    it('父级文件夹', function(){
        var o = new Uri('http://qiao:123456@jiayou.com/index.php/logo.png?type=huawei&size=1080*720#top');
        assert.equal(o.shortOf(obase), '../logo.png?type=huawei&size=1080*720#top');
    });
    it('父级同级子文件夹', function(){
        var o = new Uri('http://qiao:123456@jiayou.com/index.php/home/logo.png?type=huawei&size=1080*720#top');
        assert.equal(o.shortOf(obase), '../home/logo.png?type=huawei&size=1080*720#top');
    });
});