const axios = require('axios');

module.exports = async function api_upload_url({ImageUri, cookie}) {

		const config = {
			'method': 'get', 'url': "https://creator.douyin.com/aweme/v1/creator/get/url/", //
			'params': {
				'uri': ImageUri,//
				'cookie_enabled': 'true', //
				'screen_width': '1536',////
				'screen_height': '864',//
				'browser_language': 'zh-CN', //
				'browser_platform': 'Win32', //
				'browser_name': 'Mozilla',//
				'browser_version': '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',//
				'browser_online': 'true',//
				'timezone_name': 'Asia/Shanghai',//
				'aid': '1128',//
				'msToken': '2Xtonyj9zAiYMkQ4Du_2fLYl8hnKnyFFTF1acCuTG7RJLwrRypH0xJsEQu0pMEzvFeE_z3wgOJSrtTY9rWaQdPcPTcTYJxEBlU8jkbciPzoZeJUSBfm0xp9TpOr607zlpkYcBtVfWSnVoR4FubAIKOtuOHM_L3bzdc-bg-tSd9sUWLsVDb2yZA==',//
				'a_bogus': 'Y6s5h7XwQpRjFp/SmcEOelclHLEMNTSyNFTORLXn7OoqTHtbVrHfNca4GxutgtFgkmBcwoMHKf0MGDxb/sskZ2rpompfSLT6Zs2CIWfo8qiDYFvkLHgES0Uzuw0FUOiNaACji10RUsMrInVRIHVEAppa95zo55jgSNB9p2t9cDCW3syTV9I5Cagw',//
			},//
			'headers': {
				'Cookie': cookie,//
				'accept': 'application/json, text/plain, */*',//
				'accept-language': 'zh-CN,zh;q=0.9',//
				'cache-control': 'no-cache',//
				'pragma': 'no-cache',//
				'priority': 'u=1, i',//
				'referer': 'https://creator.douyin.com/creator-micro/content/upload?enter_from=dou_web',//
				'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',//
				'sec-ch-ua-mobile': '?0',//
				'sec-ch-ua-platform': '"Windows"',//
				'sec-fetch-dest': 'empty',//
				'sec-fetch-mode': 'cors',//
				'sec-fetch-site': 'same-origin',//
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
				
				
			},//
			
			
		}
		
		const {data: resp} = await axios(config);
		if (!(resp.status_code === 0)) throw new Error('接口:异常---api_upload_url')
		console.log(`接口:成功---api_upload_url`)
		return resp.url.uri;

}