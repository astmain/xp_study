class Clazz {
	webview = null
	// 方法=============
	run = require('./run')
	main = async ({ partition, url, container, style }) => {
		let webview = await this.run({ partition, url, container, style })
		webview.call_eval = require('./call_eval')
		webview.goto = require('./goto')
		webview.navigation = require('./navigation')
		webview.localStorage_set = require('./localStorage_set')
		window['web'] = webview
		return webview
	}
}

globalThis.webview_run = async function Webview_run({ partition, url, container, style }) {
	let clazz = new Clazz()
	let webview = await clazz.main({ partition, url, container, style })
	return webview
}



globalThis.webview_run = async function Webview_run({ partition, url, container, style }) {
	let clazz = new Clazz()
	let webview = await clazz.main({ partition, url, container, style })
	return webview
}
module.exports = globalThis.webview_run