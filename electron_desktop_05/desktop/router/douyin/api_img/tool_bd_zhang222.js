const jsrsasign = require('jsrsasign');
const elliptic = require('elliptic');
const crypto = require("crypto");
function j(e) {
    for (var t = new Uint8Array(e.length / 2), n = 0; n < e.length; n += 2) {
        t[n / 2] = parseInt(e.substr(n, 2), 16);
    }
    e = t;
    for (var t = [], n = 0; n < e.length; n += 3)
        for (var r = e[n] << 16 | e[n + 1] << 8 | e[n + 2], o = 0; o < 4; o++)
            8 * n + 6 * o <= 8 * e.length ? t.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(r >>> 6 * (3 - o) & 63)) : t.push("=");
    return t.join("")
}

function getSecretkey(e, t) {
    var r, n, i, o, a, c = function(e) {
        var t = new jsrsasign.X509;
        t.readCertPEM(e);
        var r = t.getPublicKey().getPublicKeyXYHex();

        return "02".concat(r.x)
    }(t),
        s = new elliptic.ec("p256"),
        u = null === (r = jsrsasign.KEYUTIL.getKey(e)) || void 0 === r ? void 0 : r.prvKeyHex, f = s.keyFromPrivate(u, "hex").derive(s.keyFromPublic(c, "hex").getPublic()).toArray("be", 32), d = new Uint8Array(f);
    return n = new Uint8Array,
    i = d,
    o = new Uint8Array,
    void 0 === (a = 32) && (a = 32),
    function(e, t, r) {
        void 0 === r && (r = 32);
        for (var n = new Uint8Array, i = "", o = 0; n.length < r; ) {
            o++;
            var a = Uint8Array.from(Be(Be(Be([], Array.from(Uint8Array.from(Oe(i))), !0), Array.from(t), !0), [o], !1));
            i = Ke(Oe(e), a),
            n = Uint8Array.from(Be(Be([], Array.from(n), !0), Array.from(Uint8Array.from(Oe(i))), !0))
        }
        return Uint8Array.from(n.slice(0, r))
    }(function(e, t) {
        return e && 0 !== e.length || (e = new Uint8Array(32)),
        Ke(e, t)
    }(n, i), o, a)

    function Ke(e, t) {
        return sign(e, t)
    }

    function sign(r,n){
        const key = Buffer.from(r); // 将 Uint8Array 转换为 Buffer
        // 使用 HMAC-SHA256
        const hash = crypto.createHmac('sha256', key).update(n).digest('hex');
        return hash;
    }
    function Oe(e) {
        return Uint8Array.from((e.match(/.{1,2}/g) || []).map((function(e) {
            return parseInt(e, 16)
        }
        )))
    };

    function Be(e, t, r) {
        if (r || 2 === arguments.length)
            for (var n, i = 0, o = t.length; i < o; i++)
                !n && i in t || (n || (n = Array.prototype.slice.call(t, 0, i)),
                n[i] = t[i]);
        return e.concat(n || Array.prototype.slice.call(t))
    }
}
function sign(r,n){
    const key = Buffer.from(r); // 将 Uint8Array 转换为 Buffer
    console.log("key---------------",key);
    // 使用 HMAC-SHA256
    const hash = crypto.createHmac('sha256', key).update(n).digest('hex');

    return hash;
}
// 发布
const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function toBase64(str) {
    // str = b'{"ts_sign": "ts.2.77d09c9d3c835e8e6760fae968b2d875684417530b3e0e9da80fd2a7856eb46ac4fbe87d2319cf05318624ceda14911ca406dedbebeddb2e30fce8d4fa02575d", "req_content": "ticket,path,timestamp", "req_sign": "/MTpqeTKkfh44r/po+92vkBtcPwQZo9luN9OuIOXUZA=", "timestamp": 1741916882}'
    console.log("str",str)
    str = str.replace(/\:/g, ': ').replace(/",/g,'\", ');
    console.log("str",str)
    let binary = '';

    // 将字符串转换为二进制字符串
    for (let i = 0; i < str.length; i++) {
        const binaryChar = str.charCodeAt(i).toString(2).padStart(8, '0');
        binary += binaryChar;
    }

    let base64 = '';
    // 每 6 位为一组，转换为 Base64 字符
    for (let i = 0; i < binary.length; i += 6) {
        const chunk = binary.slice(i, i + 6);
        const index = parseInt(chunk.padEnd(6, '0'), 2);
        base64 += base64Chars[index];
    }

    // 填充等号（Base64 需要 4 字节为一组）
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }

    return base64;
}
const create = function(ts_sign,ticket,privateKeyPEM,certificatePEM) {
    // let dateTime = 1741916882 //Math.floor(Date.now() / 1000)
    let dateTime = Math.floor(Date.now() / 1000)

    // console.log("ddddddd",dateTime)
    console.log("dateTime",dateTime)
    let message = 'ticket='+ticket+'&path=/web/api/media/aweme/create/&timestamp='+dateTime
    let req_sign = jsrsasign.hextob64(sign(getSecretkey(privateKeyPEM,certificatePEM),message))
    console.log("message",message)
    console.log("req_sign",req_sign)
    let jsonstr = JSON.stringify({
        "ts_sign":ts_sign,
        "req_content":"ticket,path,timestamp",
        "req_sign": req_sign,
        "timestamp": dateTime
    })
    return toBase64(jsonstr)
};




function getBdTicketGuardReePublicKey(privateKeyPEM){
    // 获取公钥对象
    const publicKey = jsrsasign.KEYUTIL.getKey(privateKeyPEM);
    // 生成公钥的十六进制字符串
    const publicKeyHex = publicKey.generatePublicKeyHex();
    return j(publicKeyHex)
}
module.exports = {create, getBdTicketGuardReePublicKey}
