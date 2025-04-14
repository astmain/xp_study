const AnyProxy = require('anyproxy')
const filter_ajax = require("./filter/filter_ajax.js")
const filter_html = require("./filter/filter_html.js")
const filter_javascript = require("./filter/filter_javascript.js")
const config = {
	rule: {
		* beforeSendResponse(req, res) {
			let resp_type = tool_format_header(req, res)
			req.url = decodeURIComponent(req.url);
			// console.log(`req.url ---`,     req.url         )
			switch (resp_type) {
				case "html":
					filter_html(req, res)
					// console.log(`html---`, req.url)
					break;
				case "javascript":
					filter_javascript(req, res)
					// console.log(`javascript---`, req.url)
					break;
				case "ajax":
					filter_ajax(req, res)
					// console.log(`ajax---`, req.url)
					break;
				default:
				// console.log(`其它类型---`, req.url)
			}
			
			
			return {response: res.response};
		}
	}, port: 10086, //浏览器插件设置代理端口
	webInterface: {enable: true, webPort: 8002,},//是否显示web127.0.0.1:8002  显示拦截信息
	throttle: 99999, //下载速率
	forceProxyHttps: true, //是否强制拦截https
	wsIntercept: false, // 不开启websocket代理
	// silent: false, //是不是(安静)要打印consle控制台
	silent: true, //是不是(安静)要打印consle控制台
	// systemProxy: true, //全局系统代理
	systemProxy: true, //全局系统代理
	
}

// anyproxy实例化
const proxyServer = new AnyProxy.ProxyServer(config)


// 全局系统代理判断
config.systemProxy == true ? AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', 10086) : AnyProxy.utils.systemProxyMgr.disableGlobalProxy()


// 监听服务
proxyServer.on('ready', () => {
})
proxyServer.on('error', (e) => {
})

proxyServer.start()


console.log('\x1B[33m%s\x1b[0m:', `
成功启动:http://127.0.0.1:8002   1请检查是否安装了RootCA安装证书    2请开启浏览器代码10086端口
测试url:                                http://103.119.2.223:3000/index



`)


function tool_format_header(req, res) {
	// 请求头转小写
	let new_header = {}
	for (const key in res.response.header) {
		new_header[key.toLowerCase()] = res.response.header[key]
	}
	
	// html格式
	if (new_header["content-type"] && new_header["content-type"].includes("text/html")) {
		return "html"
		
	}
	//javascript格式
	else if (new_header["content-type"] && (new_header["content-type"].includes("javascript"))) {
		return "javascript"
	}
	// 	ajax格式
	else {
		return "ajax"
	}
	
	
}

