const {app, BrowserWindow, ipcMain, session, ipcRenderer, WebContentsView, View} = require('electron')
const connect_puppeteer_electron = require("./connect_puppeteer_electron");
const Spider = require("./puppeteer/Spider");
// electron关闭警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// electron开启端口让puppeteer-core链接
app.commandLine.appendSwitch("remote-debugging-address", "127.0.0.1");//开启webSocketDebuggerUrl地址
app.commandLine.appendSwitch("remote-debugging-port", "8400")//开启webSocketDebuggerUrl端口
app.commandLine.appendSwitch("disable-site-isolation-trials");//控制iframe如果要用时需要开启,来禁用站点隔离试验。
app.commandLine.appendSwitch('disable-web-security') //关闭浏览器安全策略


main()


let config = {
	// icon: PATH["logo"],//
	width: 1800,
	height: 1024,
	x: 2600,
	y: 0,
	webPreferences: {
		preload: require('path').join(__dirname, 'preload.js'),//预加载脚本
		webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
		webSecurity: false, // 禁用web安全同源策略,可以跨域发送ajax
		sandbox: false, // 沙盒开启,没办法使用preload   沙盒 Electron 会在渲染进程中启用一个沙箱环境。这个沙箱环境会限制渲染进程的权限,使其无法访问敏感的系统资源,如文件系统、网络、环境变量等。渲染进程只能使用 Web APIs 提供的功能,无法调用 Node.js 的功能。
		devTools: true, // electron web控制台
		allowDisplayingInsecureContent: true, //控制在 HTTPS 页面中是否允许显示 第三方HTTP 内容
		allowRunningInsecureContent: true, // HTTPS 页面中, Electron 应用程序会允许加载和运行 HTTP 资源(如脚本、插件等)
		nodeIntegration: true, // 在渲染进程中,可以直接访问 Node.js 的全局对象和模块,就像在 Node.js 脚本中一样           是否启用node集成 渲染进程的内容有访问node的能力 //设置能在页面使用nodejs的API
		contextIsolation: true, //关闭警告信息,Electron 会在渲染进程中创建一个独立的 JavaScript 执行上下文(context)。这个独立的上下文中不会共享 Node.js 的全局对象和模块,比如 require、process、global 等。渲染进程中的代码只能访问浏览器提供的 Web APIs,而不能访问 Node.js 的功能
		nodeIntegrationInSubFrames: true, // 在渲染进程的子框架(iframe)中,可以直接访问 Node.js 的全局对象和模块,就像在 Node.js 脚本中一样
		backgroundThrottling: false, //当 Electron 应用程序处于后台时(窗口不可见),Electron 会自动限制渲染进程的执行速度
		enableRemoteModule: true, //渲染进程访问主进程对象的方法,   enableRemoteModule保证renderer.js可以可以正常require('electron').remote，此选项默认关闭
		nodeIntegrationInWorker: true, // WebWorker 进程是否能够访问 Node.js
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36',//
		// offscreen:true,//(很重要)是否绘制和渲染可视区域外的窗口. 默认值为 false.
	},
}


async function main() {
	
	await app.whenReady()
	
	app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : 0)
	
	// 监听####################################################################################
	require("./ON_ajax")
	require("./ON_webContents")
	// require("./ON_webview_open_url")
	// require("./ON_window_open_new_page.js")
	
	
	// IPC通信####################################################################################
	require("./IPC_get_PATH")
	require("./IPC_get_cookies")
	require("./IPC_get_cookies_str")
	require("./IPC_set_cookies")
	require("./IPC_set_cookies_item")
	
	
	// IPC_spider爬虫框架####################################################################################
	require("./IPC_spider")
	require("./IPC_spider_webview")
	require("./IPC_spider_browserWindow")
	
	// IPC_spider爬虫框架_IPC_WebContentsView####################################################################################
	globalThis.WebContentsView_manager = {}
	require("./IPC_WebContentsView_executeJavaScript")
	require("./IPC_WebContentsView_init")
	require("./IPC_WebContentsView_goto")
	require("./IPC_WebContentsView_manager_info")
	require("./IPC_WebContentsView_open_devtools")
	require("./IPC_WebContentsView_show")
	require("./IPC_WebContentsView_size")
	require("./IPC_WebContentsView_size_height")
	require("./IPC_WebContentsView_size_width")
	require("./IPC_WebContentsView_size_x")
	require("./IPC_WebContentsView_size_y")
	require("./IPC_WebContentsView_spider")
	require("./IPC_WebContentsView_zoom")
	
	
	// 主窗口####################################################################################
	globalThis.main_window = new BrowserWindow(config)
	let url = "https://xiaohongshu.com"
	// let url = "https://creator.xiaohongshu.com"
	
	await main_window.loadURL(url, {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36'})
	main_window.webContents.openDevTools()
	console.log(`程序路径---:`, PATH)
	
	
	// 等待页面加载完成后设置 Cookie
	main_window.webContents.on('did-finish-load', () => {
		cookies = [//
			{"name": "xsecappid", "value": "ugc", "domain": ".xiaohongshu.com", "path": "/", "expires": 1774061952, "size": 12, "httpOnly": false, "secure": false, "session": false, "priority": "Medium", "sameParty": false, "sourceScheme": "Secure", "sourcePort": 443}, {"name": "websectiga", "value": "10f9a40ba454a07755a08f27ef8194c53637eba4551cf9751c009d9afb564467", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 74, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "galaxy.creator.beaker.session.id", "value": "1742371186799090549765", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 54, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {
				"name": "galaxy_creator_session_id",
				"value": "7sIxLO4NEttJfL64JymufBBZMVt4Om8TK8ns",
				"domain": ".xiaohongshu.com",
				"path": "/",
				"expires": -1,
				"size": 61,
				"httpOnly": true,
				"secure": false,
				"session": true,
				"priority": "Medium",
				"sameParty": false,
				"sourceScheme": "NonSecure",
				"sourcePort": 80
			}, {"name": "access-token-creator.xiaohongshu.com", "value": "customer.creator.AT-68c517483427261691885916ksfdkznip3p3cogp", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 96, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "customer-sso-sid", "value": "68c5174834271972673762884sqf1dhsuzuu7em3", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 56, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "loadts", "value": "1742344383195", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 19, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {
				"name": "acw_tc",
				"value": "0a0d0f5817425254828943282ec56253c333568b628aa674f26ac08eff404d",
				"domain": "creator.xiaohongshu.com",
				"path": "/",
				"expires": 1742527282.24805,
				"size": 68,
				"httpOnly": true,
				"secure": false,
				"session": false,
				"priority": "Medium",
				"sameParty": false,
				"sourceScheme": "Secure",
				"sourcePort": 443
			}, {"name": "gid", "value": "yj2YY2ijy2Y0yj2YY2iYWi84ff8Wl8TWxJSqqxfIF1K7Cq28j1W8hA888q2qJq48q88J8842", "domain": ".xiaohongshu.com", "path": "/", "expires": 3213754882.923658, "size": 75, "httpOnly": false, "secure": false, "session": false, "priority": "Medium", "sameParty": false, "sourceScheme": "Secure", "sourcePort": 443}, {"name": "x-user-id-creator.xiaohongshu.com", "value": "6551e606000000000802eca1", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 57, "httpOnly": true, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "a1", "value": "195885f87dd07o0k7h2c3nrl6ux9l70v8f33q04hd50000353234", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 54, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {
				"name": "x-user-id-pro.xiaohongshu.com",
				"value": "6551e606000000000802eca1",
				"domain": ".xiaohongshu.com",
				"path": "/",
				"expires": -1,
				"size": 53,
				"httpOnly": true,
				"secure": false,
				"session": true,
				"priority": "Medium",
				"sameParty": false,
				"sourceScheme": "NonSecure",
				"sourcePort": 80
			}, {"name": "abRequestId", "value": "dcedb6ba-662d-55bf-9488-3991098afbfe", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 47, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {"name": "web_session", "value": "040069b425a54e70bcf794b5e5354b80543eb1", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 49, "httpOnly": true, "secure": true, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "Secure", "sourcePort": 443}, {"name": "webId", "value": "ce58ac2d95743a469e2f8b6e6917778b", "domain": ".xiaohongshu.com", "path": "/", "expires": -1, "size": 37, "httpOnly": false, "secure": false, "session": true, "priority": "Medium", "sameParty": false, "sourceScheme": "NonSecure", "sourcePort": 80}, {
				"name": "customerClientId",
				"value": "633796322913620",
				"domain": ".xiaohongshu.com",
				"path": "/",
				"expires": -1,
				"size": 31,
				"httpOnly": true,
				"secure": false,
				"session": true,
				"priority": "Medium",
				"sameParty": false,
				"sourceScheme": "NonSecure",
				"sourcePort": 80
			}, {"name": "sec_poison_id", "value": "1701ae16-38de-4f05-b346-1410c5599bdb", "domain": ".xiaohongshu.com", "path": "/", "expires": 1742526389, "size": 49, "httpOnly": false, "secure": false, "session": false, "priority": "Medium", "sameParty": false, "sourceScheme": "Secure", "sourcePort": 443}]
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i]
			cookie = {url: url, ...cookie}
			main_window.webContents.session.cookies.set(cookie)
			.then(() => {
				console.log('Cookie 设置成功');
			})
			.catch((error) => {
				console.error('设置 Cookie 时出错:', error);
				console.log('设置 Cookie 时出错cookie:', cookie);
			});
		}
		
		
	});
	
	
}

