const axios = require("axios");
const fs = require("fs");

module.exports = async function api_upload_file_chuck({file_name, StoreUri, Auth,cookie}) {

		// 计算文件crc32##########################################################
		let chunk = fs.readFileSync(file_name)
		let crc32 = (require('crc32')(chunk)).toUpperCase()// 需要大写       '8FBAB688'  按位与运算、十六进制转换和大写转
		let crc32_min = crc32.toLowerCase()// 需要大写       '8FBAB688'  按位与运算、十六进制转换和大写转
		let config = {
			method: 'post', url: `https://tos-d-x-lf.douyin.com/upload/v1/${StoreUri}`,//
			data: chunk,//
			headers: {
				'Cookie': cookie,//
				'content-crc32': crc32_min, //
				'authorization': Auth,//
				'accept': '*/*',//
				'accept-language': 'zh-CN,zh;q=0.9',//
				'cache-control': 'no-cache',//
				'content-disposition': 'attachment; filename="undefined"', //
				'content-type': 'application/octet-stream',//
				'origin': 'https://creator.douyin.com',//
				'pragma': 'no-cache',//
				'priority': 'u=1, i',//
				'referer': 'https://creator.douyin.com/',//
				'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',//
				'sec-ch-ua-mobile': '?0',//
				'sec-ch-ua-platform': '"Windows"', //
				'sec-fetch-dest': 'empty',//
				'sec-fetch-mode': 'cors', //
				'sec-fetch-site': 'cross-site',//
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', //
				'x-storage-u': '',//
			}
		}
		let {data: resp} = await axios(config)
		// console.log(`api_upload_file---resp:`, resp)
		if (!(resp.message === "Success")) throw new Error(`接口:异常---api_upload_file_chuck`)
		console.log(`接口:成功---api_upload_file_chuck`)
		return resp

	
}