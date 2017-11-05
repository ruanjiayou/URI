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
        this.pathname = '/';
        // 查询参数 ?开头
        this.query = {};
        // 锚点 #开头
        this.hash = '';
        // other 
        this.other = '';
        if (str) {
            this.parse(str);
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
            return this.create(str);
        }
        if (Uri.HREF.has(this.protocol) || this.protocol === 'malto:') {
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
            if (json.hasOwnerProperty(k)) {
                this[k] = json[k];
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
        return this.protocol + this.userinfo + this.host + this.path + this.search + this.hash + this.other;
    }
    /**
     * 依据当前URI对象，将字符串解析为URI对象并返回。可以是相对路径。
     * @param {string} str 
     * @return {object} 
     */
    create(str) {

    }
    /**
     * 根据指定URI对象，将对象本身转换为相对url路径。协议必须是http或https。
     */
    shortOf() {

    }

    set protocol(str) {
        this._protocol = /^([0-9a-z]+)[:]?$/i.test(str) ? RegExp.$1 + ':' : 'http:';
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
    set search(str) {
        str = str.replace('#', '%23');
        if (str && str.charAt(0) !== '?') {
            str = '?' + str;
        }
        this.query = {};
        var paramArr = str.substr(1).split('&');
        for (let i = 0; i < paramArr.length - 1; i++) {
            let temp = paramArr[i].split('=');
            if (temp.length === 2 && temp[0] !== '') {
                this.query[temp[0]] = temp[1];
            }
        }
    }
    set hash(str) {
        if (str && str.charAt(0) !== '#') {
            str = '#' + str;
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
        return this.hostname + (this.port === '' ? '' : ':' + this.port);
    }
    get userinfo() {
        let res = this.username;
        if (res) {
            if (this.password) {
                res += ':' + this.password;
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
        return this._pathname;
    }
    get search() {
        let res = '';
        for (let key in this.query) {
            if (this.params.hasOwnerProperty(key)) {
                res += '&' + key + '=' + this.query[key];
            }
        }
        return res === '' ? '' : '?' + res.substring(1);
    }
    get hash() {
        return this._hash;
    }
}
Uri.HREF = new Set(['ftp:', 'http:', 'https:', 'file:']);

module.exports = Uri;