const axios = require("axios");
const tool_random_str = require("./tool_random_str")
const tool_signature = require("./tool_signature")

module.exports = async function api_upload_key({ auth_info, user_id,cookie}) {
	console.log(`接口:加密---api_upload_key---tool_signature`)
		let params = {'user_id': user_id, 's': tool_random_str({len: 11}), 'Action': 'ApplyImageUpload', 'Version': '2018-08-01', 'ServiceId': 'jm8ajry58r', 'app_id': '2906',}
		let inner_headers = new tool_signature(auth_info, "imagex").get_authoration({params})
		let config = {method: 'get', url: "https://imagex.bytedanceapi.com/", params, headers: {...inner_headers, Cookie: cookie}}
		let {data: resp} = await axios(config)
		// console.log(`api_upload_key---resp:`,api_upload_key)
		if (!resp.Result) throw new Error(`接口:异常---api_upload_key`)
		console.log(`接口:成功---api_upload_key`)
		let obj = resp.Result
		let RequestId = obj.RequestId
		let vid = obj.InnerUploadAddress.UploadNodes[0].Vid
		let UploadHost = obj.InnerUploadAddress.UploadNodes[0].UploadHost
		let SessionKey = obj.InnerUploadAddress.UploadNodes[0].SessionKey
		let StoreUri = obj.InnerUploadAddress.UploadNodes[0].StoreInfos [0].StoreUri
		let Auth = obj.InnerUploadAddress.UploadNodes[0].StoreInfos [0].Auth
		let UploadID = obj.InnerUploadAddress.UploadNodes[0].StoreInfos [0].UploadID
		let result = {RequestId, UploadHost, SessionKey, StoreUri, Auth, UploadID}
		return result

	
	
}