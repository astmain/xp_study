const {app, BrowserWindow, ipcRenderer} = require('electron')
function run_window() {
    let mainWindow = new BrowserWindow({
        // width: 1800, height: 900, x: -2600 - 100, y: 100, //
        // width: 1800, height: 1000, x: 2500 + 100, y: 50, //
        // ...winState.winOptions,//窗口大小位置状态管理
        // icon: "D:\\AAA\\xx_work\\electron_desktop_00\\public\\rebot.png",//
        // icon: get_path().path_log,//
        webPreferences: {

            defaultEncoding: 'utf-8',        // 设置字符编码
            webviewTag: true,                // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
            // webSecurity: false,              // 禁用web安全同源策略,可以跨域发送ajax
            // nodeIntegration: true,           //
            // contextIsolation: false,         //
            // enableRemoteModule: true,        //


            // webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
            // webSecurity: false, // 禁用web安全同源策略,可以跨域发送ajax
            // sandbox: false, // 沙盒开启,没办法使用preload   沙盒 Electron 会在渲染进程中启用一个沙箱环境。这个沙箱环境会限制渲染进程的权限,使其无法访问敏感的系统资源,如文件系统、网络、环境变量等。渲染进程只能使用 Web APIs 提供的功能,无法调用 Node.js 的功能。
            // devTools: true, // electron web控制台
            // allowDisplayingInsecureContent: true, //控制在 HTTPS 页面中是否允许显示 第三方HTTP 内容
            // allowRunningInsecureContent: true, // HTTPS 页面中, Electron 应用程序会允许加载和运行 HTTP 资源(如脚本、插件等)
            // nodeIntegration: true, // 在渲染进程中,可以直接访问 Node.js 的全局对象和模块,就像在 Node.js 脚本中一样           是否启用node集成 渲染进程的内容有访问node的能力 //设置能在页面使用nodejs的API
            // contextIsolation: true, //关闭警告信息,Electron 会在渲染进程中创建一个独立的 JavaScript 执行上下文(context)。这个独立的上下文中不会共享 Node.js 的全局对象和模块,比如 require、process、global 等。渲染进程中的代码只能访问浏览器提供的 Web APIs,而不能访问 Node.js 的功能
            // nodeIntegrationInSubFrames: true, // 在渲染进程的子框架(iframe)中,可以直接访问 Node.js 的全局对象和模块,就像在 Node.js 脚本中一样
            // backgroundThrottling: false, //当 Electron 应用程序处于后台时(窗口不可见),Electron 会自动限制渲染进程的执行速度
            // enableRemoteModule: true, //渲染进程访问主进程对象的方法,   enableRemoteModule保证renderer.js可以可以正常require('electron').remote，此选项默认关闭
            // nodeIntegrationInWorker: true, // WebWorker 进程是否能够访问 Node.js
            // userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36',//


        }
    })


    // mainWindow.loadURL(`http://127.0.0.1:22222?now=${Date.now()}`, {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36'})
    mainWindow.loadURL(`http://127.0.0.1:22222`)
    // mainWindow.webContents.openDevTools()
    // setTimeout(()=>{
    //     // 使用remote功能
    //     const {initialize, enable} = require('@electron/remote/main')
    //     initialize()
    //     enable(mainWindow.webContents)
    // },2000)


}

app.whenReady().then(() => {
    run_window()
    app.on('activate', async function () {
        if (BrowserWindow.getAllWindows().length === 0) run_window()
    })
})


app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : 0)