const axios = require("axios")
const tool_signature = require("./tool_signature");


module.exports = async function api_upload_img_info({auth_info, SessionKey, uid,cookie}) {
	console.log(`接口:加密---api_upload_img_info---tool_signature`)
		let data = JSON.stringify({'SessionKey': SessionKey, "Functions": [{"name": "GetMeta"}, {"name": "Snapshot", "input": {"SnapshotTime": 0}}]})
		let params = {"Action": "CommitImageUpload", "Version": "2018-08-01", 'ServiceId': 'jm8ajry58r', "user_id": '',}
		let commit_headers = new tool_signature(auth_info, "imagex").get_authoration({params, method: "POST", body: data})
		let config = {
			method: 'post', url: "https://imagex.bytedanceapi.com/",//
			data: data,
			headers: {
				'Cookie': cookie,//
				...commit_headers,//
			},
			params, //
		}
		let {data: res_data} = await axios(config)
		
		
		let ResponseMetadata = res_data?.ResponseMetadata
		let Results = res_data?.Result?.Results
		
		
		if (!(ResponseMetadata && Results)) throw new Error(`接口:成功---api_upload_img_info`)
		console.log(`接口:成功---api_upload_img_info`)
		let ImageUri = Results[0]['Uri']
		let ImageHeight = Results[0]['ImageMeta']['Height']
		let ImageWidth = Results[0]['ImageMeta']['Width']
		return {ImageUri, ImageWidth, ImageHeight}

	
	
}

