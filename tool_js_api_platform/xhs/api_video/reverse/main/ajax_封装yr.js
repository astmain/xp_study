const axios = require("axios");
module.exports = ajax_封装yr

async function ajax_封装yr({params, cookies}) {
    var conf = {
        method: 'get', url: 'https://edith.xiaohongshu.com/api/media/v1/upload/web/permit', params: params, headers: {
            Cookie: cookies,
            authority: 'edith.xiaohongshu.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'zh-CN',
            'cache-control': 'no-cache',
            origin: 'https://creator.xiaohongshu.com',
            pragma: 'no-cache',
            referer: 'https://creator.xiaohongshu.com/',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36',
        },
    }
    let res = await axios(conf)
    return res
}