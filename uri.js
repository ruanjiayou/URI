const qs = require('qs');
const pathToRegexp = require('path-to-regexp');

class Uri {
    /**
     * @constructor
     * @param {string} str 
     */
    constructor(str) {
        // 协议 http https ftp gopher file javascript malto tel other
        this.protocol = '';
        // 用户名
        this.username = '';
        // 密码
        this.password = '';
        // 主机名或IP
        this.hostname = '';
        // 端口 
        this.port = '';
        // 路径 file协议也是这个
        this.pathname = '';
        // 查询参数 ?开头
        this._search = {};
        // 锚点 #开头
        this.hash = '';
        // other 
        this.other = '';
        if (str) {
            this.parse(str.trim());
        }
    }
    /**
     * 把字符串解析为URI对象。必须是绝对路径。
     * @param {string} str 
     * @return {object} - this
     */
    parse(str) {
        var index = -1;
        // 1.验证类型
        if (typeof str !== 'string') {
            throw (new Error('类型必须是string！'));
        }
        // 2.解码
        if (/^http%3A%2F%2F/.test(str)) {
            str = unescape(str);
        }
        // 3.protocol
        var temp = /^(\w+)[:](.+)$/.exec(str);
        if (temp) {
            this.protocol = temp[1];
            str = temp[2];
        } else {
            this.protocol = 'http:';
        }
        if (Uri.HREF.has(this.protocol) || this.protocol === 'mailto:') {
            // 去掉开头的/ file:类型要保留第三个/
            str = str.replace(/^[/]{0,2}/, '');
            // 4.username password
            temp = /^([a-z0-9]+)([:]([a-z0-9]+))?[@](.+)$/ig.exec(str);
            if (temp) {
                this.username = temp[1];
                if (temp[3] !== undefined) {
                    this.password = temp[3];
                }
                str = temp[4];
            }
            // 5.hostname port
            temp = /^([^/:]+)([:](\d+))?(.*)/.exec(str);
            if (temp) {
                this.hostname = temp[1];
                if (temp[3] !== undefined) {
                    this.port = temp[3];
                }
                str = temp[4];
            }
            // 6.hash
            index = str.indexOf('#');
            if (index !== -1) {
                this.hash = str.substring(index);
                str = str.slice(0, index);
            }
            // 7.search
            index = str.indexOf('?');
            if (index !== -1) {
                this.search = str.substr(index);
                str = str.slice(0, index);
            }
            // 8.pathname
            this.pathname = str;
        } else {
            this.other = str;
        }
        return this;
    }
    /**
     * 格式化URI对象
     * @param {object} json - 所有set字段
     */
    format(json) {
        for (let k in json) {
            switch (k) {
                case 'protocol':
                    this.protocol = json[k];
                    break;
                case 'username':
                    this.username = json[k];
                    break;
                case 'password':
                    this.password = json[k];
                    break;
                case 'hostname':
                    this.hostname = json[k];
                    break;
                case 'port':
                    this.port = json[k];
                    break;
                case 'pathname':
                    this.pathname = json[k];
                    break;
                case 'search':
                    this.search = json[k];
                    break;
                case 'hash':
                    this.hash = json[k];
                    break;
                case 'other':
                    this.other = json[k];
                    break;
                default: break;
            }
        }
        return this;
    }
    /**
     * 将URI对象转为字符串
     * @return {string} 
     */
    toString() {
        // url other 两种种类型
        return this.protocol + (Uri.HREF.has(this.protocol) ? '//' : '') + this.userinfo + this.host + this.path + this.hash + this.other;
    }
    /**
     * 依据当前URI对象，将字符串解析为URI对象并返回。可以是相对路径。
     * @param {string} str 
     * @return {object} 
     */
    create(str) {
        var uri,
            ps,
            cs,
            index,
            path = '',
            other = '';
        str = str.trim();
        if (/^(\w+)[:](.+)$/.test(str) || /^[/]{2}(.+)/.test(str)) {
            return new Uri(str);
        }
        uri = new Uri().format({
            'protocol': this.protocol,
            'username': this.username,
            'password': this.password,
            'hostname': this.hostname,
            'port': this.port
        });
        //分离出path
        index = str.indexOf('?');
        if (index !== -1) {
            other = str.substring(index);
            str = str.substring(0, index);
        }
        path = str;
        // 分离search.hash
        index = other.indexOf('#');
        if (index !== -1) {
            uri.hash = other.substring(index);
            other = other.substring(0, index);
        }
        uri.search = other;
        ps = path.charAt(0) === '/' ? [] : this.pathname.split('/');
        cs = path.split('/');
        // 路径比较处理 - 去掉最后的文件
        if (ps.length > 0 && /.[.]./.test(ps[ps.length - 1])) {
            ps.pop();
        }
        while (cs.length !== 0) {
            if (cs[0] === '.') {
                cs.shift();
                break;
            } else if (cs[0] === '..') {
                cs.shift();
                ps.pop();
            } else {
                break;
            }
        }
        ps = ps.concat(cs);
        for (var i = ps.length - 1; i > 0; i--) {
            if (ps[i] === '') {
                ps.splice(i, 1);
            }
        }
        uri.pathname = ps.join('/');
        return uri;
    }
    /**
     * 根据指定URI对象，将对象本身转换为相对url路径。协议必须是http或https。
     */
    shortOf(parent) {
        var ps = parent.pathname.split('/'),
            cs = this.pathname.split('/'),
            len = ps.length < cs.length ? cs.length : ps.length,
            diffIndex = 0,
            i = 0,
            res = '';
        if (ps.length > 0 && /.[.]./.test(ps[ps.length - 1])) {
            ps.pop();
        }
        // compare directory
        for (; i < len; i++) {
            if (cs[i] !== ps[i]) {
                diffIndex = i;
                break;
            }
        }
        ps.splice(0, diffIndex);
        res += ps.map(function (item) { return '../'; }).join('');
        res += cs.splice(diffIndex).join('/');
        return res + this.search + this.hash;
    }
    /**
     * 获取参数值
     * @param {string} key - 参数名称
     */
    query(key) {
        return this._search[key];
    }
    /**
     * 返回url的拓展名(小写) 或 ''
     */
    ext() {
        let m = /[.]([\w]+)$/.exec(this.pathname);
        return m ? m[1].toLowerCase() : '';
    }
    /**
     * 匹配指定模式路由,返回null或json
     */
    match(pat) {
        let res = {};
        let m = pat.re.exec(this.pathname);
        if (m === null) {
            return null;
        }
        pat.keys.forEach(function (item, index) {
            res[item.name] = m[index + 1];
        });
        return res;
    }
    set protocol(str) {
        this._protocol = /^([0-9a-z]+)[:]?$/i.test(str.toLowerCase()) ? RegExp.$1 + ':' : 'http:';
    }
    set username(str) {
        this._username = str;
    }
    set password(str) {
        this._password = str;
    }
    set hostname(str) {
        this._hostname = str;
    }
    set port(str) {
        if (/^\d*$/.test(str)) {
            this._port = str;
        }
    }
    set pathname(str) {
        this._pathname = str.replace(/[?#]/g, function (match) {
            return encodeURIComponent(match);
        });
    }
    /**
     * undefined会被删掉,null则转为空字符串
     * @param {string|object} o - search值
     */
    set search(o) {
        o = typeof o === 'object' ? o : (qs.parse(o.substr(0, 1) === '?' ? o.substr(1) : o));
        for (let k in o) {
            if (o[k] === undefined) {
                delete this._search[k];
            } else if (o[k] === null) {
                this._search[k] = '';
            } else {
                this._search[k] = o[k];
            }
        }
    }
    set hash(str) {
        if (str && str.charAt(0) === '#') {
            str = str.substring(1);
        }
        this._hash = str;
    }
    set other(str) {
        this._other = str;
    }

    get href() {
        return this.toString();
    }
    get origin() {
        let res = this.protocol;
        if (['ftp:', 'http:', 'https:'].indexOf(this.protocol) === -1) {
            res += '//';
        } else if ('file:' === this.protocol) {
            res += '///';
        }
        res += this.host;
        return res;
    }
    get host() {
        return this.hostname + (this.port === '' ? '' : `:${this.port}`);
    }
    get userinfo() {
        let res = this.username;
        if (res) {
            if (this.password) {
                res += `:${this.password}`;
            }
            res += '@';
        }
        return res;
    }
    get auth() {
        return this.userinfo;
    }
    get path() {
        return this.pathname + this.search;
    }
    get protocol() {
        return this._protocol;
    }
    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
    get hostname() {
        return this._hostname;
    }
    get port() {
        return this._port;
    }
    get pathname() {
        return Uri.HREF.has(this.protocol) && this._pathname.charAt(0) !== '/' ? `/${this._pathname}` : this._pathname;
    }
    get search() {
        let res = qs.stringify(this._search);
        return res === '' ? '' : `?${decodeURIComponent(res)}`;
    }
    get hash() {
        return this._hash === '' ? '' : `#${encodeURI(this._hash)}`;
    }
    get other() {
        return this._other;
    }
}
Uri.HREF = new Set(['ftp:', 'http:', 'https:', 'file:']);

module.exports = Uri;