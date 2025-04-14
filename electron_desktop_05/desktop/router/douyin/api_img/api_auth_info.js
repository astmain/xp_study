const axios = require("axios");

module.exports = async function api_auth_info({cookie}) {
	let config = {
		method: "get", url: "https://creator.douyin.com/web/api/media/upload/auth/v5/",//
		headers: {
			"cookie": cookie, //
			'accept': 'application/json, text/plain, */*',//
			'accept-language': 'zh-CN,zh;q=0.9',//
			'cache-control': 'no-cache',//
			'pragma': 'no-cache',//
			'priority': 'u=1, i',//
			'referer': 'https://creator.douyin.com/creator-micro/content/upload?enter_from=dou_web',//
			'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"', //
			'sec-ch-ua-mobile': '?0', //
			'sec-ch-ua-platform': '"Windows"', //
			'sec-fetch-dest': 'empty', //
			'sec-fetch-mode': 'cors',//
			'sec-fetch-site': 'same-origin',//
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',//
		},//
		params: {
			cookie_enabled: "true", screen_width: "1920",//
			screen_height: "1080", browser_language: "zh-CN", //
			browser_platform: "Win32", browser_name: "Mozilla",//
			browser_version: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",//
			browser_online: "true", timezone_name: "Asia/Shanghai",//
			aid: "1128",//
			msToken: "",//
		},
	}

		const response = await axios(config);
		// console.log(`getAccessKeyInfo---response:`, response)
		if (response.data.status_code != 0) throw new Error(`接口:成功---api_auth_info`)
		console.log(`接口:成功---api_auth_info`)
		const auth_info = JSON.parse(response.data.auth)
		return auth_info;

}