const tool_random_str = require("./tool_random_str");
const tool_signature = require("./tool_signature");
const axios = require("axios");
const fs = require("fs");

module.exports = async function api_img_upload({auth_info, img_path, uid, cookie}) {
	let config = {
		'method': "get", 'url': 'https://imagex.bytedanceapi.com/', //
		"params": {'s': tool_random_str({len: 11}), 'Action': 'ApplyImageUpload', 'Version': '2018-08-01', 'ServiceId': 'jm8ajry58r', 'app_id': '2906', 'user_id': uid,}, //
		'headers': {"cookie": cookie},
	}
	let commit_headers = new tool_signature(auth_info, "imagex").get_authoration(config.params)
	config.headers = {...commit_headers, ...config.headers}
	let {data: resp} = await axios(config)
	
	
	let StoreUri = resp.Result.InnerUploadAddress.UploadNodes[0].StoreInfos[0].StoreUri
	let Auth = resp.Result.InnerUploadAddress.UploadNodes[0].StoreInfos[0].Auth
	
	
	let buffer = fs.readFileSync(img_path)
	let crc32_hash = require('crc32')(buffer)
	let crc32_upper = crc32_hash.toUpperCase()// 大写
	let crc32_low = crc32_hash.toLowerCase()// 小写
	
	let config2 = {
		"method": "post", "url": 'https://tos-hl-x.snssdk.com/upload/v1/' + StoreUri,//
		"data": buffer,//
		"headers": {
			"cookie": cookie,//
			'authorization': Auth,//
			'content-crc32': crc32_low,//
			'accept': '*/*', 'accept-language': 'zh-CN,zh;q=0.9',//
			'content-disposition': 'attachment; filename="undefined"',//
			'content-type': 'application/octet-stream',//
			'origin': 'https://creator.douyin.com',//
			'pragma': 'no-cache',//
			'priority': 'u=1, i',//
			'referer': 'https://creator.douyin.com/',//
			'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',//
			'sec-ch-ua-mobile': '?0',//
			'sec-ch-ua-platform': '"Windows"',//
			'sec-fetch-dest': 'empty',//
			'sec-fetch-mode': 'cors',//
			'sec-fetch-site': 'cross-site', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',//
			'x-storage-u': '',//
		}
	}
	
	
	let {data: resp2} = await axios(config2)
	if (resp2.message != "Success") {
		console.error(`接口:数据异常---api_img_upload---resp2`, resp2)
		throw new Error(`接口:数据异常---api_img_upload`)
	}
	return StoreUri
}