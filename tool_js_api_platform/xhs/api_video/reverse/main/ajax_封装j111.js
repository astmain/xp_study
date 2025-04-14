const axios = require("axios");
module.exports = ajax_封装j111

async function ajax_封装j111(cookie_str) {
    let params = {biz_name: 'spectrum', scene: 'video', file_count: 1, version: 1, source: 'web'}
    var conf = {
        method: 'get', url: 'https://edith.xiaohongshu.com/api/media/v1/upload/web/permit',
        params: params,//
        headers: {
            Cookie: cookie_str,
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
    const {data} = res.data || {}
    const uploadTempPermits = data?.uploadTempPermits
    if (!uploadTempPermits) throw {...res, message: '获取凭证信息错误'}
    // console.log('🚀 uploadTempPermits  返回值  :', uploadTempPermits)
    // debugger
    return uploadTempPermits || []
}