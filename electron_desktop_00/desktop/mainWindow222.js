const {app, BrowserWindow} = require('electron')
const path = require('path')
const {initialize, enable} = require('@electron/remote/main')
const winState = new (require('electron-win-state').default)({})

app.commandLine.appendSwitch("disable-site-isolation-trials")           //控制iframe如果要用时需要开启,来禁用站点隔离试验。
app.commandLine.appendSwitch('disable-web-security')                    //关闭浏览器安全策略
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';// electron关闭警告

console.log(`111---222:`, winState.winOptions)

function createWindow() {

    const mainWindow = new BrowserWindow({
        // width: 800,
        // height: 600,
        ...winState.winOptions,//窗口大小位置状态管理
        webPreferences: {
            webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
            webSecurity: false, // 禁用web安全同源策略,可以跨域发送ajax
            nodeIntegration: true, contextIsolation: false, enableRemoteModule: true,
        }
    })

    initialize()
    enable(mainWindow.webContents)
    mainWindow.loadURL(`http://127.0.0.1:22222?now=${Date.now()}`, {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36'})
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})