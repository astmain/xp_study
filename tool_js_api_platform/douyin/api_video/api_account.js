const axios = require("axios")
module.exports = api_account = async ({cookie = ""}) => {
	let config = {method: 'get', url: "https://creator.douyin.com/web/api/media/user/info/", params: {_signature: ""}, headers: {Cookie: cookie}}
	let {data: resp} = await axios(config)
	// console.log(`api_get_account---resp---:`, resp)
	if ((resp?.status_code === 0 && resp?.user?.uid) === false) throw Error("账号登陆.失败")
	return {status_code: resp.status_code, nickname: resp.user.nickname, uid: resp.user.uid}
	
}