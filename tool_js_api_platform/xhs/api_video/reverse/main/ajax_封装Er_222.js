const axios = require("axios");
module.exports = ajax_封装Er_222
async function ajax_封装Er_222(params, token) {
    let config = {
        method: 'get', //
        url: 'https://ros-upload.xiaohongshu.com/', //
        params: params,//
        headers: {
            'x-cos-security-token': token,//
            authority: 'ros-upload.xiaohongshu.com', //
            'accept-language': 'zh-CN', //
            origin: 'https://creator.xiaohongshu.com',//

        },
    }

    let res = await axios(config)
    return res
}