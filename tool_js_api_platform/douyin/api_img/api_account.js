const axios = require("axios")
module.exports = async function api_account({cookie}) {

		let config = {method: 'get', url: "https://creator.douyin.com/web/api/media/user/info/", params: {_signature: ""}, headers: {Cookie: cookie}}
		let {data: resp} = await axios(config)

		if (!(resp?.user?.uid && resp?.status_code === 0)) {
			console.log(`api_account---resp:`,     resp        )
			throw new Error(`接口:账号异常`)
		}
		console.log(`接口:成功---api_account`)
		let result = {nickname: resp.user?.nickname, uid: resp?.user?.uid}
		return result

}