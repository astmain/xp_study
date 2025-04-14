//官方文档electron_webview详细函数          https://www.electronjs.org/zh/docs/latest/api/webview-tag#warning
export default class WEBVIEW {
	constructor() {
		this.webview = null
		this.webviewId = null
		this.eval_call = require("./eval_call")
		this.goto = require("./goto")
		this.openDevTools = require("./openDevTools")
		this.create = require("./create")
		this.override_navigator = require("./override_navigator")
		this.style = require("./style")
		this.reload = require("./reload")
		this.goBack = require("./goBack")
		this.goForward = require("./goForward")

	}


	
	
}
