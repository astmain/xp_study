require('tool_js_web')
require('tool_js_node')
const {app, BrowserWindow, ipcMain, session, ipcRenderer, WebContentsView, View} = require('electron')
const winState = new (require('electron-win-state').default)({})
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';// electron关闭警告
// electron开启端口让puppeteer-core链接
app.commandLine.appendSwitch("remote-debugging-address", "127.0.0.1")   //开启webSocketDebuggerUrl地址
app.commandLine.appendSwitch("remote-debugging-port", "8400")           //开启webSocketDebuggerUrl端口
app.commandLine.appendSwitch("disable-site-isolation-trials")           //控制iframe如果要用时需要开启,来禁用站点隔离试验。
app.commandLine.appendSwitch('disable-web-security')                    //关闭浏览器安全策略
log_app(`启动remote-debugging-address===============================`)


main()


let config = {
    icon: "./logo.png",//
    ...winState.winOptions,//窗口大小位置状态管理
    // x: 1980,//
    // y: 350,//
    // width: 1280,//
    // height: 650,//
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
    // 监听=============================================================================
    require("./listener/listener_ajax")
    require("./listener/listener_webContents")
    require("./listener/listener_webview_open_url")
    // IPC通信 =============================================================================
    require("./ipc/IPC_get_PATH")
    require("./ipc/IPC_get_cookies")
    require("./ipc/IPC_get_cookies_str")
    require("./ipc/IPC_set_cookies")
    require("./ipc/IPC_set_cookies_item")
    // 服务 =============================================================================
    run_service()

    // 主窗口=============================================================================
    globalThis.main_window = new BrowserWindow(config)

    await main_window.loadURL(`http://127.0.0.1:22222?now=${Date.now()}`, {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36'})
    main_window.webContents.openDevTools()
    winState.manage(main_window)


}


function run_service() {
    const express = require('express')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const service = express()
    service.use('/static', express.static('static')) //设置静态文件目录
    service.use(cors({origin: '*', methods: '*', allowedHeaders: '*'})) //跨域设置
    service.use(bodyParser.json())
    // 路由 ======================================================
    service.use(require('./router/index'))
    service.use(require('./router/tb_collect'))
    service.use(require('./router/tb_history'))
    service.use(require('./router/ipc'))
    service.use(require('./router/douyin/video_publish'))


    service.listen(5566, () => {
        console.log(`
		本地 ==============================
		http://127.0.0.1:5566/index
		http://127.0.0.1:5566/index?name=小许&age=18
		
		
		数据接口
		http://127.0.0.1:5566/tb_collect/list
		
		http://127.0.0.1:5566/tb_history/list
		http://127.0.0.1:5566/tb_history/create
  `)
    })
}


