const axios = require("axios");
module.exports = ajax_封装Tt2

async function ajax_封装Tt2({数据_文本_xml, headers, url}) {
    let conf = {
        method: 'post',//
        url: url, //
        data: 数据_文本_xml, //
        headers: {
            'Content-Type': headers['Content-Type'],
            'X-Cos-Security-Token': headers['X-Cos-Security-Token'],
            authority: 'edith.xiaohongshu.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'zh-CN',
            pragma: 'no-cache',
            origin: 'https://creator.xiaohongshu.com',
            referer: 'https://creator.xiaohongshu.com/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36',
        }, timeout: 0,
    }
    let res = await axios(conf)
    return res
}