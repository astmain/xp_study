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
     // let dateTime = Math.floor(Date.now() / 1000)
     // let message = 'ticket=' + ticket + '&path=/web/api/media/aweme/create_v2/&timestamp=' + dateTime
     // return toBase64(JSON.stringify({
     //     "ts_sign": ts_sign, "req_content": "ticket,path,timestamp", "req_sign": jsrsasign.hextob64(sign(getSecretkey(privateKeyPEM, certificatePEM), message)), "timestamp": dateTime
     // }))


     let params= {ts_sign, ticket, privateKeyPEM, certificatePEM}
     let config = {method: 'get', url: 'http://103.119.2.223:3000/tool_bd_create', params}
     let {data: {create_value}} = await axios(config)
     // console.log(`create---create_value:`, create_value)
     return create_value
}


async function getBdTicketGuardReePublicKey(privateKeyPEM) {
    // // // let privateKeyPEM = '-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgqmRROgDmqipscRDP\r\nWXLrLy1DfmXCb9TG1OGyTrzmuauhRANCAARpc+KmmRtlNNtFg3nxeyoonf4eqPgh\r\nRFI8HQqdA1V5iI+uSwtMM0m0Kzan6Igh2rAyvsozN0fTGyX4gHk8+a2a\r\n-----END PRIVATE KEY-----\r\n'
    // // 获取公钥对象
    // const publicKey = jsrsasign.KEYUTIL.getKey(privateKeyPEM);
    // // 生成公钥的十六进制字符串
    // const publicKeyHex = publicKey.generatePublicKeyHex();
    // return j(publicKeyHex)

    // 借用网络请求
    let axios = require("axios")
    let config = {method: 'get', url: 'http://103.119.2.223:3000/jsrsasign_KEYUTIL_getKey', params: {privateKeyPEM: privateKeyPEM}}
    // let config = {method: 'get', url: 'http://103.119.2.223:3000/index', params: {privateKeyPEM: bbb}}
    let {data: {publicKeyHex}} = await axios(config)
    // console.log('getBdTicketGuardReePublicKey---publicKeyHex---', publicKeyHex)
    return j(publicKeyHex)


    // 利用ipc通信让渲染进程帮忙处理
    // let result = await ipc_get_privateKeyPEM(privateKeyPEM)
    // return j(result)
}

////原本打算使用electron传数据给前端页面通信得到数据
// const {app, ipcMain} = require('electron')
// async function ipc_get_privateKeyPEM(privateKeyPEM) {
//     let SEND_ID = `${new Date().getTime()}_${Math.floor(Math.random() * 999999)}`
//     // let privateKeyPEM = '-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgqmRROgDmqipscRDP\r\nWXLrLy1DfmXCb9TG1OGyTrzmuauhRANCAARpc+KmmRtlNNtFg3nxeyoonf4eqPgh\r\nRFI8HQqdA1V5iI+uSwtMM0m0Kzan6Igh2rAyvsozN0fTGyX4gHk8+a2a\r\n-----END PRIVATE KEY-----\r\n'
//     await app.mainWindow.webContents.send('ipc_get_privateKeyPEM', {SEND_ID, privateKeyPEM})
//     return new Promise(async (resolve, reject) => {
//         ipcMain.handle('ipc_get_privateKeyPEM2', async (event, agrs) => {
//             console.log(`message_from_main2---agrs:`, agrs)
//             if (SEND_ID === agrs.send_id) {
//                 ipcMain.removeHandler('message_from_main2');
//                 resolve(agrs.result)
//             }
//         })
//     })
// }
//
// async function ipc_get_privateKeyPEM(privateKeyPEM) {
//     let SEND_ID = `${new Date().getTime()}_${Math.floor(Math.random() * 999999)}`
//     // let privateKeyPEM = '-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgqmRROgDmqipscRDP\r\nWXLrLy1DfmXCb9TG1OGyTrzmuauhRANCAARpc+KmmRtlNNtFg3nxeyoonf4eqPgh\r\nRFI8HQqdA1V5iI+uSwtMM0m0Kzan6Igh2rAyvsozN0fTGyX4gHk8+a2a\r\n-----END PRIVATE KEY-----\r\n'
//     await app.mainWindow.webContents.send('ipc_get_privateKeyPEM', {SEND_ID, privateKeyPEM})
//     return new Promise(async (resolve, reject) => {
//         ipcMain.handle('ipc_get_privateKeyPEM2', async (event, agrs) => {
//             console.log(`message_from_main2---agrs:`, agrs)
//             if (SEND_ID === agrs.send_id) {
//                 ipcMain.removeHandler('message_from_main2');
//                 resolve(agrs.result)
//             }
//         })
//     })
// }





module.exports = {
    create, getBdTicketGuardReePublicKey
}


// let ticket = "hash.kprIy8jaujxGBtSWZsYCJddIzYUxSas5WxpGuJVnClc="
// let ts_sign = "ts.2.2acd4aab60a3e4faf8f425598695808b5f324ed8c8930b7ef629e7578cdb4d17c4fbe87d2319cf05318624ceda14911ca406dedbebeddb2e30fce8d4fa02575d"
// let privateKey = '-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg9Dd+G0cHr2y7E3FX\r\n6av01vGWYuXzQcxk+NnV/Z5lXSuhRANCAATDKfdA0ZVLiXn0EmzDMnj+yStJWmkW\r\nfwsGYI7ochptVpsQ+1htJq+zoL7BMjagHZbW+ETPIloiPqSjU98rUuKO\r\n-----END PRIVATE KEY-----\r\n'
//
// let csr = "-----BEGIN CERTIFICATE-----\n" +
//     "MIIEfTCCBCKgAwIBAgIUXWdS2tzmSoewCWfKFyiWMrJqs/0wCgYIKoZIzj0EAwIw\n" +
//     "MTELMAkGA1UEBhMCQ04xIjAgBgNVBAMMGXRpY2tldF9ndWFyZF9jYV9lY2RzYV8y\n" +
//     "NTYwIBcNMjIxMTE4MDUyMDA2WhgPMjA2OTEyMzExNjAwMDBaMCQxCzAJBgNVBAYT\n" +
//     "AkNOMRUwEwYDVQQDEwxlY2llcy1zZXJ2ZXIwWTATBgcqhkjOPQIBBggqhkjOPQMB\n" +
//     "BwNCAASE2llDPlfc8Rq+5J5HXhg4edFjPnCF3Ua7JBoiE/foP9m7L5ELIcvxCgEx\n" +
//     "aRCHbQ8kCCK/ArZ4FX/qCobZAkToo4IDITCCAx0wDgYDVR0PAQH/BAQDAgWgMDEG\n" +
//     "A1UdJQQqMCgGCCsGAQUFBwMBBggrBgEFBQcDAgYIKwYBBQUHAwMGCCsGAQUFBwME\n" +
//     "MCkGA1UdDgQiBCABydxqGrVEHhtkCWTb/vicGpDZPFPDxv82wiuywUlkBDArBgNV\n" +
//     "HSMEJDAigCAypWfqjmRIEo3MTk1Ae3MUm0dtU3qk0YDXeZSXeyJHgzCCAZQGCCsG\n" +
//     "AQUFBwEBBIIBhjCCAYIwRgYIKwYBBQUHMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0\n" +
//     "aW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL29jc3AwRgYIKwYBBQUH\n" +
//     "MAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\n" +
//     "cnRpZmljYXRlL29jc3AwdwYIKwYBBQUHMAKGa2h0dHA6Ly9uZXh1cy1wcm9kdWN0\n" +
//     "aW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL2Rvd25sb2FkLzQ4RjlD\n" +
//     "MEU3QjBDNUE3MDVCOTgyQkU1NTE3MDVGNjQ1QzhDODc4QTguY3J0MHcGCCsGAQUF\n" +
//     "BzAChmtodHRwOi8vbmV4dXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UubmV0L2FwaS9j\n" +
//     "ZXJ0aWZpY2F0ZS9kb3dubG9hZC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1\n" +
//     "RjY0NUM4Qzg3OEE4LmNydDCB5wYDVR0fBIHfMIHcMGygaqBohmZodHRwOi8vbmV4\n" +
//     "dXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UuY29tL2FwaS9jZXJ0aWZpY2F0ZS9jcmwv\n" +
//     "NDhGOUMwRTdCMEM1QTcwNUI5ODJCRTU1MTcwNUY2NDVDOEM4NzhBOC5jcmwwbKBq\n" +
//     "oGiGZmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\n" +
//     "cnRpZmljYXRlL2NybC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1RjY0NUM4\n" +
//     "Qzg3OEE4LmNybDAKBggqhkjOPQQDAgNJADBGAiEAqMjT5ADMdGMeaImoJK4J9jzE\n" +
//     "LqZ573rNjsT3k14pK50CIQCLpWHVKWi71qqqrMjiSDvUhpyO1DpTPRHlavPRuaNm\n" +
//     "ww==\n" +
//     "-----END CERTIFICATE-----"
// console.log(getBdTicketGuardReePublicKey(privateKey))

//
// console.log(create(ts_sign,ticket,privateKey,csr))