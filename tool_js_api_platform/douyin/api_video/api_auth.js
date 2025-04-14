
const axios = require("axios")
module.exports = api_auth = async ({cookie = ""}) => {
    let config = {
        method: 'get', url: "https://creator.douyin.com/web/api/media/upload/auth/v5/",//
        params: {
            "cookie_enabled": "true",
            "screen_width": "1920",
            "screen_height": "1080",
            "browser_language": "zh-CN",
            "browser_platform": "Win32",
            "browser_name": "Mozilla",
            "browser_version": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "browser_online": "true",
            "timezone_name": "Asia/Shanghai",
            "aid": "1128",
            "msToken": ""
        }, //
        headers: {Cookie: cookie}
    }
    let {data:res_data} = await axios(config)
    // console.log(`res_data---api_get_upload_auth:`,     res_data        )
    return res_data
}