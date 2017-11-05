var Uri = require('../uri');
//var assert = require('assert');
require('should');
describe('#parse()', function(){
    var uri = 'http://ruanjiayou:123456@jiayou.com:8080/admin/index.html?time=3333&redirect=/#top';
    var o = new Uri(uri);
    it(uri, function(){
        o.protocol.should.equal('http:');
        o.username.should.equal('ruanjiayou');
        o.password.should.equal('123456');
        o.hostname.should.equal('jiayou.com');
        o.port.should.equal('8080');
        o.pathname.should.equal('/admin/index.html');
        o.hash.should.equal('#top');
        o.query.time.should.equal('3333');
    });
});