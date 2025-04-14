const axios = require("axios");
module.exports = api_video_upload_chunk = async ({is_final = false, put_url, Auth, crc32, uid, chunk, cookie, crc32_join}) => {
	if (is_final === false) {
		let config = {
			"method": 'post', "url": put_url,//
			"params": {_signature: ""},//
			"data": chunk,//
			"headers": {
				"Cookie": cookie,//
				"X-Storage-U": uid,//
				'Authorization': Auth,//
				'Content-CRC32': crc32.toLowerCase(), //小写
				'Content-Length': chunk.length, //
				'Content-Disposition': 'attachment; filename="undefined"', //
				'Content-Type': 'application/octet-stream',//
			},
		}
		let {data: resp} = await axios(config)
		if (resp.message != 'Success') {
			console.log("失败:接口数据异常---api_upload_file_chunk---resp", resp)
			throw Error("失败:接口数据异常---api_upload_file_chunk")
		}
		return resp
	} else {
		let data = crc32_join.slice(0, crc32_join.length - 1)
		let config = {
			"method": 'post', //
			"url": put_url,//
			"data": data,//
			"headers": {
				"Cookie": cookie,//
				'Authorization': Auth,//
				"X-Storage-U": uid,//
				'Content-Type': 'text/plain;charset=UTF-8',//
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',//
			}
		}
		let {data: resp} = await axios(config)
		// console.log(`resp---:`, resp)
		if (resp.message != 'Success') {
			console.log("失败:接口数据异常---api_video_upload_chunk---resp", resp)
			throw Error("失败:接口数据异常---api_video_upload_chunk")
		}

		return resp
	}
	
	
}