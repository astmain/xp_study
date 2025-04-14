const {app, BrowserWindow, ipcMain, session, ipcRenderer} = require('electron')
// app拦截webview和webContents打开新窗口问题  参考文章https://blog.csdn.net/weixin_56295520/article/details/131826632

//当一个新的 webContents 被创建时触发。     //当渲染器使用 window.open 打开子窗口 进行拦截配置
// app.on('web-contents-dom-ready',async function (event, webContents) {
app.on('web-contents-created', async function (event, webContents) {





    // webContents_cancel_protocol({webContents})





    //
    // ses.protocol.handle('bitbrowser', (request) => {
    //     console.log("拦截到bitbrowser协议，禁止打开")
    //     return false
    // })
    //
    webContents.addListener("dom-ready", (event, contents) => {
        if (webContents.getType() === "window") {
            // console.log(`ON_webContents111---window---{getType,getURL,getTitle}`, webContents.getType(), webContents.getURL(), webContents.getTitle())
        }

        if (webContents.getType() === "webview") {
            // console.log(`ON_webContents222---webview---{getType,getURL,getTitle}`, webContents.getType(), webContents.getURL(), webContents.getTitle())
        }

    })


})


function tool_file_path_parse(filePath) {
    // 处理 Windows 风格的路径
    if (filePath.includes('\\')) {
        filePath = filePath.replace(/\\/g, '/');
    }

    const parts = filePath.split('/');
    const fileName = parts.pop();
    const fileExtension = fileName.split('.').pop();
    const directory = parts.join('/');

    return {fileName, fileExtension, directory}
}
function webContents_cancel_protocol({webContents}) {
    try{
        webContents.session.protocol.registerFileProtocol('bitbrowser', (request, callback) => {
            console.debug("bitbrowser request", request.url)
            callback()
        })
        webContents.session.protocol.handle('bitbrowser', (request) => {
            console.log("拦截到bitbrowser协议，禁止打开")
            return false
        })

    }catch (error) {

    }
}

