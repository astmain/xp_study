const axios = require("axios");
module.exports = ajax_小红书_发布

async function ajax_小红书_发布({params, data, cookies, headers}) {
    let conf = {
        method: 'post', url: 'https://edith.xiaohongshu.com/web_api/sns/v2/note', //
        params: params, //
        data: data,//
        headers: {
            Cookie: cookies, //
            'x-s': headers['X-S'], //
            'x-t': headers['X-T'],//
            origin: 'https://creator.xiaohongshu.com',
            referer: 'https://creator.xiaohongshu.com/',
            authority: 'edith.xiaohongshu.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9',
            authorization: '',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36',
            'content-type': 'application/json',
        },
    }


    let res = await axios(conf)
    return res
}


