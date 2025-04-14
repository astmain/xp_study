const axios = require("axios");
module.exports = async function api_img_coverurl({video_uri, cookie}) {
	let config = {
		"method": 'get',//
		"url": "https://creator.douyin.com/aweme/v1/creator/get/url/",//
		"headers": {
			"Cookie": cookie,//
			'accept': 'application/json, text/plain, */*',//
			'accept-language': 'zh-CN,zh;q=0.9',//
			'pragma': 'no-cache',//
			'priority': 'u=1, i',//
			'referer': 'https://creator.douyin.com/creator-micro/content/upload?enter_from=dou_web',//
			'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',//
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',//
			
		}, //
		"params": {
			"uri": video_uri,//
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
			"_signature": "_02B4Z6wo00101dWVeYAAAIDAtp-56JCxFr3VkX0AABGjQxZgvr3XNWnCu-wxL22Qc.Ex8Tl4cd8JVwjcFOhOaNu0WTdlB.6FJodU8iP41NcVUsh7B6LXWeHywBcXc6HUdb1Md1PKH0oASKYq5b",//
		},//
	}
	let {data: resp} = await axios(config)
	// console.log(`111---resp:`,resp)
	if (!resp['url']['url_list'][0]) {
		console.log("接口:数据异常---api_img_coverurl---resp", resp)
		throw new Error(`接口:数据异常---api_img_coverurl`)
	}

	let coverurl = resp['url']['url_list'][0]
	return coverurl
	
}