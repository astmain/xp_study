const _ = require('lodash')
const axios = require('axios')
let head_com = [//
	'Upgrade-Insecure-Requests', //当浏览器收到这个响应头部时,它会自动将所有不安全的 HTTP 请求升级为 HTTPS 请求。这有助于提高网站的整体安全性,并为用户提供更好的安全体验。
	'Sec-Fetch-User', //在这个示例中,Sec-Fetch-User: ?1 表示该请求是由用户直接发起的。需要注意的是,Sec-Fetch-User 头部字段是由浏览器自动添加的,开发者一般无需手动设置。但是在某些情况下,开发者可能需要根据特定的业务需求,在自定义的请求中添加这个头部字段。总的来说, Sec-Fetch-User 头部字段可以帮助服务器更好地识别用户发起的请求,从而提供更好的用户体验和应用安全性。
	'sec-ch-ua', 'Content-Type', //
	// "DNT",
	'sec-ch-ua-mobile', //
	'sec-ch-ua-platform', //
	'Cookie', 'Host', 'Connection', //
	'Pragma', //
	'Cache-Control', //
	'Accept', //
	'Access-Control-Request-Method', //
	'Access-Control-Request-Headers', //
	'Origin', //
	'User-Agent', //
	'Sec-Fetch-Mode', //
	'Sec-Fetch-Site', //
	'Sec-Fetch-Dest', //
	'Referer', //
	'Accept-Encoding', //
	'Accept-Language', //
]
module.exports = async function filter_ajax(req, res) {
	let url = req.url //Uint8Array表示的二进制数据解码为文本字符串
	let body = textDecoder.decode(res.response.body) //Uint8Array表示的二进制数据解码为文本字符串
	body = decode_u(body) // Unicode解码（u开头）
	// body拦截=================================================
	if (body.includes('123')) {
		// console.log('找到了---permission---req.url:', body)
		// res.response.body = '222'
	}
	
	
	// url拦截=================================================
	if (url.includes('http://103.119.2.223:3000/index')) {
		console.log(`url找到了=============================================`)
		console.log(`url---222:`, url)
		console.log(`body---222:`, res.response.body)
		console.log(`body---222:`, body)
		
		res.response.body = '222'
	}
	
	
	return {req, res}
}

function decode_u(str) {
	//扣取 FeHelper(前端助手)  中 Unicode解码（u开头）的代码            使用 dom点击断点,搜索代码片段  EncodeUtils.uniDecode(this.sourceContent.replace
	let e = str
	e = e = e.replace(/(\\)?\\u/gi, '%u').replace('%u0025', '%25')
	let r = (e = unescape(e.toString().replace(/%2B/g, '+'))).match(/(%u00([0-9A-F]{2}))/gi)
	if (r) for (let t = 0; t < r.length; t++) {
		let n = r[t].substring(1, 3)
		Number('0x' + n) >= 128 && (e = e.replace(r[t], n))
	}
	return (e = unescape(e.toString().replace(/%2B/g, '+')))
}
