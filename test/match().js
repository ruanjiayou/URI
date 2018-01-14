var Uri = require('../uri');
var assert = require('assert');
const pathToRegexp = require('path-to-regexp');

// 测试format()函数
describe('Uri.match()', function () {
    it('http {}', function () {
        let u1 = new Uri('http://www.zrmm.com/index/123');
        let u2 = new Uri('http://www.zrmm.com/tag/c测试');
        let u3 = new Uri('http://www.zrmm.com/tag/c测试/2');
        let u4 = new Uri('http://www.zrmm.com/tag/b测试');
        let u5 = new Uri('http://www.zrmm.com/tags/b测试');

        let pat1 = {
            route: '/index/:page([0-9]+)',
            re: null,
            keys: []
        };
        let pat2 = {
            route: '/tag/:tag',
            re: null,
            keys: []
        };
        let pat3 = {
            route: '/tag/:tag/:page([0-9]+)?',
            re: null,
            keys: []
        };
        pat1.re = pathToRegexp(pat1.route, pat1.keys);
        pat2.re = pathToRegexp(pat2.route, pat2.keys);
        pat3.re = pathToRegexp(pat3.route, pat3.keys);

        let r1 = u1.match(pat1);
        let r2 = u2.match(pat2);
        let r3 = u3.match(pat3);
        let r4 = u4.match(pat3);
        let r5 = u5.match(pat3);

        console.log(r1);
        console.log(r2);
        console.log(r3);
        console.log(r4);
        console.log(r5);
    });
});