const {ipcMain, WebContentsView, webFrameMain, app} = require("electron")

// let isdebug = false
let isdebug = true

//参数表 https://blog.csdn.net/qq_29069649/article/details/136417393
//参数表 https://www.electronjs.org/docs/latest/api/browser-window#page-visibility
ipcMain.handle("IPC_WebContentsView_init", async function (event, {desc = "默认-初始化WebContentsView", key, partition}) {
    // require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    const child_view = new WebContentsView({
        webPreferences: {
            sandbox: true, // 沙盒开启,没办法使用preload   沙盒 Electron 会在渲染进程中启用一个沙箱环境。这个沙箱环境会限制渲染进程的权限,使其无法访问敏感的系统资源,如文件系统、网络、环境变量等。渲染进程只能使用 Web APIs 提供的功能,无法调用 Node.js 的功能。
            webSecurity: false, // 禁用web安全同源策略,可以跨域发送ajax
            devTools: true, // electron web控制台
            partition: partition,//参数变量
             allowDisplayingInsecureContent: true, //控制在 HTTPS 页面中是否允许显示 第三方HTTP 内容
            allowRunningInsecureContent: true, // HTTPS 页面中, Electron 应用程序会允许加载和运行 HTTP 资源(如脚本、插件等)
            nodeIntegration: true, // 在渲染进程中,可以直接访问 Node.js 的全局对象和模块,就像在 Node.js 脚本中一样           是否启用node集成 渲染进程的内容有访问node的能力 //设置能在页面使用nodejs的API
            contextIsolation: true, //关闭警告信息,Electron 会在渲染进程中创建一个独立的 JavaScript 执行上下文(context)。这个独立的上下文中不会共享 Node.js 的全局对象和模块,比如 require、process、global 等。渲染进程中的代码只能访问浏览器提供的 Web APIs,而不能访问 Node.js 的功能
            nodeIntegrationInSubFrames: true, // 在渲染进程的子框架(iframe)中,可以直接访问 Node.js 的全局对象和模块,就像在 Node.js 脚本中一样
            backgroundThrottling: false, //当 Electron 应用程序处于后台时(窗口不可见),Electron 会自动限制渲染进程的执行速度  .WebContents.backgroundThrottling 设置为 false 将禁用 BrowserWindow 中所有 WebContents 的帧节流。
            enableRemoteModule: true, //渲染进程访问主进程对象的方法,   enableRemoteModule保证renderer.js可以可以正常require('electron').remote，此选项默认关闭
            nodeIntegrationInWorker: true, // WebWorker 进程是否能够访问 Node.js
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36',//
            // offscreen: true,//(很重要)是否绘制和渲染可视区域外的窗口. 默认值为 false.   //离屏渲染


        }
    })


    main_window.contentView.addChildView(child_view)
    child_view.webContents.loadURL("about:blank", {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36'})
    child_view.setBounds({x: 100, y: 100, width: 900, height: 500})


    globalThis.WebContentsView_manager[key] = child_view
    // await WebContentsView_addListener({key})

    const result = {desc: `成功:${desc}`, key, partition, IPC: "IPC_WebContentsView_init"}
    console.log(result)
    return result


})


async function WebContentsView_addListener({key}) {
    // https://www.electronjs.org/zh/docs/latest/api/web-contents#event-did-stop-loading
    let child_view = globalThis.WebContentsView_manager[key]
    child_view.webContents.addListener("dom-ready", async (event, webContents) => {
        isdebug ? console.log("111...正在加载...dom-ready") : 0
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        // await WebContentsView_manager[key].webContents.executeJavaScript(`localStorage.setItem("WebContentsView_key","${key}"  )   `)
        await WebContentsView_manager[key].webContents.executeJavaScript(`(${func_no_dialog})()`)
    })

    child_view.webContents.addListener("did-start-loading", async (event, webContents) => {
        isdebug ? console.log("222...正在加载...did-start-loading") : 0
        await WebContentsView_manager[key].webContents.executeJavaScript(`localStorage.setItem("WebContentsView_key","${key}"  )   `)
        await WebContentsView_manager[key].webContents.executeJavaScript(`(${func_no_dialog})()`)
    })
    //
    child_view.webContents.addListener("did-redirect-navigation", async (event, webContents) => {
        isdebug ? console.log("333...正在加载...did-redirect-navigation") : 0
        await WebContentsView_manager[key].webContents.executeJavaScript(`localStorage.setItem("WebContentsView_key","${key}"  )   `)
        await WebContentsView_manager[key].webContents.executeJavaScript(`(${func_no_dialog})()`)
    })
    //
    child_view.webContents.addListener("page-title-updated", async (event, webContents) => {
        isdebug ? console.log("444...正在加载...page-title-updated") : 0
        await WebContentsView_manager[key].webContents.executeJavaScript(`localStorage.setItem("WebContentsView_key","${key}"  )   `)
        await WebContentsView_manager[key].webContents.executeJavaScript(`(${func_no_dialog})()`)
    })
    child_view.webContents.addListener("did-navigate-in-page", async (event, webContents) => {
        isdebug ? console.log("555...正在加载...did-navigate-in-page") : 0
        await WebContentsView_manager[key].webContents.executeJavaScript(`localStorage.setItem("WebContentsView_key","${key}"  )   `)
        await WebContentsView_manager[key].webContents.executeJavaScript(`(${func_no_dialog})()`)
    })
}


function func_no_dialog() {
    window.alert = () => {
        console.log(`alert---:`, 111)
    };
    window.confirm = () => {
        console.log(`confirm---:`, 111)
    };
    window.prompt = () => {
        console.log(`prompt---:`, 111)
    };
    window.onbeforeunload = () => {
        console.log(`onbeforeunload---:`, 111)
    };
    // location.href="https://www.baidu.com/"
}


