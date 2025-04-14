main()

async function main() {
	axios = require("axios")
	let config = {method: 'get', url: 'http://103.119.2.223:3000/index', data: {aaa: 111}}
	// var config = { method: 'post', url: http_api + 'api00_admin/find_opt', data: { type1: 'no03_公司查询部门用户', company: company, depart: depart } }
	// let res = await axios(config)//11
	let {data: resp} = await axios(config)
	console.log(`111---resp:`, resp)
	
}