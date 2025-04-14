const fs = require('fs')
textDecoder = new TextDecoder()

function filter_javascript(req, res) {
	let body = textDecoder.decode(res.response.body)
	// console.log(`is_javascript_handle      url: `, req.url)
	// https://s1.hdslb.com/bfs/static/jinkela/passport/static/js/0.e35f7173a3f5e31b088e.js          中国香港特别行政区
	if (req.url.includes("https://s1.hdslb.com/bfs/static/jinkela/passport/static/js/0.e35f7173a3f5e31b088e.js")) {
		let code_replace = fs.readFileSync(global.path_project + "/code_replace/b站授权_经典例子_vue.js", {encoding: "utf-8"})
		res.response.body = "//我的拦截成功\r\n" + code_replace
		// debugger
	}
	
	
	// 1响应拦截
	if (res.response && res.response.body && textDecoder.decode(res.response.body).includes("国宝")) {
		let data = textDecoder.decode(res.response.body)
		debugger
	}
	
	// ///api/edith/bridge/trade_note/permissi
	// // https://ark.xiaohongshu.com/api/edith/experiment_info?flag_name=web_goods_post_live_pre
	// // https://creator.xiaohongshu.com/login?source=&redirectReason=401&lastUrl=%252Fpublish%252Fpublish%253Ffrom%253Dmenu
	// if (req.url.includes("https://fe-static.xhscdn.com/formula-static/ugc/public/resource/js/929.e3a464f8.js")) {
	// 	console.log('我的拦截成功---小红书视频发布:', 111)
	// 	let code_replace = fs.readFileSync(global.path_project + "/code_replace/小红书视频发布.js", {encoding: "utf-8"})
	// 	res.response.body = "//我的拦截成功\r\n" + code_replace
	// 	console.log('我的拦截成功---小红书视频发布:', 222)
	// }

	//function beforeUnloadListener() {
	//function beforeUnloadListener() {
	///publish/publish
	if (req.url.includes("https://fe-static.xhscdn.com/formula-static/ugc/public/resource/js/index.1d95cfef.js")) {
		console.log('我的拦截成功---小红书登录重定向:', 111)
		let code_replace = fs.readFileSync(global.path_project + "/code_replace/小红书登录重定向.js", {encoding: "utf-8"})
		res.response.body = "//我的拦截成功\r\n" + code_replace
		console.log('我的拦截成功---小红书登录重定向:', 222)
	}
	
	
	// if (req.url.includes("https://fe-static.xhscdn.com/formula-static/ugc/public/resource/js/library-vue.3e3a60e0.js")) {
	// 	console.log('我的拦截成功---小红书replaceState:', 111)
	// 	let code_replace = fs.readFileSync(global.path_project + "/code_replace/小红书replaceState.js", {encoding: "utf-8"})
	// 	res.response.body = "//我的拦截成功\r\n" + code_replace
	// 	console.log('我的拦截成功---小红书replaceState:', 222)
	// }
	
	
	return {req, res}
}


// let code_replace = fs.readFileSync("./code_replace/aaa.js")
// let code_replace222 = fs.readFileSync("./code_replace/aaa.js", {encoding: "utf-8"})

zzzz = 1

module.exports = filter_javascript