const axios = require("axios");
module.exports = ajax_封装Tt_3333

async function ajax_封装Tt_3333(url, headers) {
    var conf = {
        method: 'post',//
        url: url, //
        data: '{}',//
        headers: {
            'X-Cos-Security-Token': headers['X-Cos-Security-Token'],//
            'Content-Type': headers['Content-Type'],//
            Accept: 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN',
            Origin: 'https://creator.xiaohongshu.com',
            Referer: 'https://creator.xiaohongshu.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36',
        },

    }
    let res = await axios(conf)
    return res
}