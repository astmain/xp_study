// 安装加密算法库
// npm i jsrsasign          //非对称加密与签名:RSA 算法,DSA 算法      对称加密:AES 算法.     . 哈希算法:MD5、SHA - 1、SHA - 256
// npm i elliptic           // 密钥对生成:  可以生成椭圆曲线密钥对，包括公钥和私钥。椭圆曲线密钥对在数字签名、加密通信等场景中起着关键作用
// npm i crypto             // 各种加密、哈希、签名、密钥生成等密码学相关的功能

const jsrsasign = require('jsrsasign');
const elliptic = require('elliptic');
const crypto = require("crypto");
const axios = require("axios");

function j(e) {
    for (var t = new Uint8Array(e.length / 2), n = 0; n < e.length; n += 2) {
        t[n / 2] = parseInt(e.substr(n, 2), 16);
    }
    e = t;
    for (var t = [], n = 0; n < e.length; n += 3) for (var r = e[n] << 16 | e[n + 1] << 8 | e[n + 2], o = 0; o < 4; o++) 8 * n + 6 * o <= 8 * e.length ? t.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(r >>> 6 * (3 - o) & 63)) : t.push("=");
    return t.join("")
}

function getSecretkey(e, t) {
    var r, n, i, o, a, c = function (e) {
        var t = new jsrsasign.X509;
        t.readCertPEM(e);
        var r = t.getPublicKey().getPublicKeyXYHex();

        return "02".concat(r.x)
    }(t), s = new elliptic.ec("p256"), u = null === (r = jsrsasign.KEYUTIL.getKey(e)) || void 0 === r ? void 0 : r.prvKeyHex, f = s.keyFromPrivate(u, "hex").derive(s.keyFromPublic(c, "hex").getPublic()).toArray("be", 32), d = new Uint8Array(f);
    return n = new Uint8Array, i = d, o = new Uint8Array, void 0 === (a = 32) && (a = 32), function (e, t, r) {
        void 0 === r && (r = 32);
        for (var n = new Uint8Array, i = "", o = 0; n.length < r;) {
            o++;
            var a = Uint8Array.from(Be(Be(Be([], Array.from(Uint8Array.from(Oe(i))), !0), Array.from(t), !0), [o], !1));
            i = Ke(Oe(e), a), n = Uint8Array.from(Be(Be([], Array.from(n), !0), Array.from(Uint8Array.from(Oe(i))), !0))
        }
        return Uint8Array.from(n.slice(0, r))
    }(function (e, t) {
        return e && 0 !== e.length || (e = new Uint8Array(32)), Ke(e, t)
    }(n, i), o, a)

    function Ke(e, t) {
        return sign(e, t)
    }

    function sign(r, n) {
        const key = Buffer.from(r); // 将 Uint8Array 转换为 Buffer
        // 使用 HMAC-SHA256
        const hash = crypto.createHmac('sha256', key).update(n).digest('hex');
        return hash;
    }

    function Oe(e) {
        return Uint8Array.from((e.match(/.{1,2}/g) || []).map((function (e) {
            return parseInt(e, 16)
        })))
    };

    function Be(e, t, r) {
        if (r || 2 === arguments.length) for (var n, i = 0, o = t.length; i < o; i++) !n && i in t || (n || (n = Array.prototype.slice.call(t, 0, i)), n[i] = t[i]);
        return e.concat(n || Array.prototype.slice.call(t))
    }
}

function sign(r, n) {
    const key = Buffer.from(r); // 将 Uint8Array 转换为 Buffer

    // 使用 HMAC-SHA256
    const hash = crypto.createHmac('sha256', key).update(n).digest('hex');

    return hash;
}

// 发布
const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function toBase64(str) {
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

 const create = async function (ts_sign, ticket, privateKeyPEM, certificatePEM) {
     let dateTime = Math.floor(Date.now() / 1000)
     let message = 'ticket=' + ticket + '&path=/web/api/media/aweme/create_v2/&timestamp=' + dateTime
     return toBase64(JSON.stringify({
         "ts_sign": ts_sign, "req_content": "ticket,path,timestamp", "req_sign": jsrsasign.hextob64(sign(getSecretkey(privateKeyPEM, certificatePEM), message)), "timestamp": dateTime
     }))
}


async function getBdTicketGuardReePublicKey(privateKeyPEM) {
    // // let privateKeyPEM = '-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgqmRROgDmqipscRDP\r\nWXLrLy1DfmXCb9TG1OGyTrzmuauhRANCAARpc+KmmRtlNNtFg3nxeyoonf4eqPgh\r\nRFI8HQqdA1V5iI+uSwtMM0m0Kzan6Igh2rAyvsozN0fTGyX4gHk8+a2a\r\n-----END PRIVATE KEY-----\r\n'
    // 获取公钥对象
    const publicKey = jsrsasign.KEYUTIL.getKey(privateKeyPEM);
    // 生成公钥的十六进制字符串
    const publicKeyHex = publicKey.generatePublicKeyHex();
    return j(publicKeyHex)
}




module.exports = {create, getBdTicketGuardReePublicKey}
