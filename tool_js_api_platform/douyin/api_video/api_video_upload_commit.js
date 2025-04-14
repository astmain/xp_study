const axios = require("axios")
const tool_signature = require("./tool_signature");
module.exports = async function api_video_upload_commit({auth_info, SessionKey, uid, cookie}) {
	let config = {
		"method": 'post',//
		"url": "https://vod.bytedanceapi.com/",//
		"headers": {"Cookie": cookie,},
		"params": {"user_id": uid, "Action": "CommitUploadInner", "Version": "2020-11-19", "SpaceName": "aweme", "app_id": "2906",},//
		"data": JSON.stringify({'SessionKey': SessionKey, "Functions": [{"name": "GetMeta"}, {"name": "Snapshot", "input": {"SnapshotTime": 0}}]}),//
		
	}
	let commit_headers = new tool_signature(auth_info).get_authoration(config.params, 'POST', config.data)
	config.headers = {...commit_headers, ...config.headers}
	
	let {data: res_data} = await axios(config)
	if (!res_data.Result.Results) {
		console.log("失败:接口数据异常---api_video_upload_commit---resp", res_data)
		throw Error("失败:接口数据异常---api_video_upload_commit")
	}
	let Uri = res_data.Result.Results[0].VideoMeta.Uri
	return Uri
	
}