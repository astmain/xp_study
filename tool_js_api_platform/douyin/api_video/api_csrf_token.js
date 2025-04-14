const axios = require("axios")

module.exports = async function api_csrf_token(cookie) {
	let config = {
		"method": "HEAD",//
		"url": 'https://creator.douyin.com/web/api/media/anchor/search',//
		"cookies": cookie,//
		"headers": {
			"Host": "creator.douyin.com",
			"sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
			"x-secsdk-csrf-version": "1.2.14",
			"x-secsdk-csrf-request": "1",
			"sec-ch-ua-mobile": "?0",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
			"sec-ch-ua-platform": "\"Windows\"",
			"accept": "*/*",
			"sec-fetch-site": "same-origin",
			"sec-fetch-mode": "cors",
			"sec-fetch-dest": "empty",
			"referer": "https://creator.douyin.com/creator-micro/home",
			"accept-language": "zh-CN,zh-TW;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6"
		},
	}
	const res = await axios(config)
	if (!res.headers['x-ware-csrf-token']) {
		console.log(`接口:数据异常---api_csrf_token---res`, res)
		throw new Error(`接口:数据异常---api_csrf_token`)
	}
	return res.headers['x-ware-csrf-token']
	
}


