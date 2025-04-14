const axios = require("axios");


module.exports = ajax_封装St_分片

async function ajax_封装St_分片({params, data, headers, route}) {
    // 源码St
    let url = `https://ros-upload.xiaohongshu.com/${route}`
    if (params) {
        url = `https://ros-upload.xiaohongshu.com/${route}?`
        let d = !1
        for (let h in params) (url += `${d ? '&' : ''}${h}=${params[h]}`), (d = !0)
    }
    var config = {
        method: 'put', //
        url: url,//
        data: data,//
        headers: {
            'x-cos-security-token': headers["X-Cos-Security-Token"],
            'authority': 'ros-upload.xiaohongshu.com',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN',
            'origin': 'https://creator.xiaohongshu.com',
            'referer': 'https://creator.xiaohongshu.com/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36',
            'content-type': 'application/json;charset=UTF-8'
        },
    };
    let res = await axios(config)
    return res
}