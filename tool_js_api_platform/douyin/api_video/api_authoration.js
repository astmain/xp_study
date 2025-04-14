const axios = require("axios")
const tool_signature = require("./tool_signature")
const tool_random_str = require("./tool_random_str")


module.exports = api_authoration = async ({auth_info, file_size, uid, cookie}) => {
	let config = {
		method: 'get', url: "https://vod.bytedanceapi.com/", //
		params: {
			"FileSize": file_size,//
			"s": tool_random_str({len: 11}),//
			"user_id": uid,//
			"Action": "ApplyUploadInner", "Version": "2020-11-19", "SpaceName": "aweme", "FileType": "video", "IsInner": "1", "app_id": "2906",
		}, //
		headers: {Cookie: cookie}
	}
	
	let inner_headers = new tool_signature(auth_info).get_authoration(config.params)
	config.headers = {...config.headers, ...inner_headers}
	let {data: resp} = await axios(config)
	if (!resp.ResponseMetadata) {
		console.log(`接口:数据异常---api_authoration---resp`, resp)
		throw new Error(`接口:数据异常---api_authoration`)
	}
	let obj = resp.Result
	let res_params = {
		RequestId: obj.RequestId,
		vid: obj.InnerUploadAddress.UploadNodes[0].Vid,
		UploadHost: obj.InnerUploadAddress.UploadNodes[0].UploadHost,
		SessionKey: obj.InnerUploadAddress.UploadNodes[0].SessionKey,
		StoreUri: obj.InnerUploadAddress.UploadNodes[0].StoreInfos [0].StoreUri,
		Auth: obj.InnerUploadAddress.UploadNodes[0].StoreInfos [0].Auth,
		UploadID: obj.InnerUploadAddress.UploadNodes[0].StoreInfos [0].UploadID,
	}
	return res_params
	
}