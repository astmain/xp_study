const axios = require("axios")
module.exports = async function api_video_enable({video_id, cookie}) {
	let config = {
		"method": 'get', //
		"url": "https://creator.douyin.com/web/api/media/video/enable/", //
		"headers": {"Cookie": cookie}, //
		"params": {
			"video_id": video_id,//
			"cookie_enabled": "true",//
			"screen_width": "1920",//
			"screen_height": "1080",//
			"browser_language": "zh-CN",//
			"browser_platform": "Win32",//
			"browser_name": "Mozilla",//
			"browser_version": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",//
			"browser_online": "true",//
			"timezone_name": "Asia/Shanghai",//
			"aid": "1128",//
			"msToken": "",//
			// "a_bogus": "OJsx6cgbMsm1lEVWX7kz9HvmO7b0YW-hgZEN5oGBuUob"
		}, //
		
	}
	let {data: resp} = await axios(config)
	// console.log(`111---resp:`,resp)
	if (resp.status_code != 0) {
		console.log("失败:接口数据异常---api_video_enable---resp", resp)
		throw Error("失败:接口数据异常---api_video_enable")
	}
	return true
}