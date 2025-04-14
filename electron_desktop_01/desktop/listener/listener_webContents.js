const {app, BrowserWindow, ipcMain, session, ipcRenderer} = require('electron')

//webContents监听创建时  参考文章https://blog.csdn.net/weixin_56295520/article/details/131826632
app.on('web-contents-created', async function (event, webContents) {
    // 取消协议
    protocol_cancel({webContents})
    // 获取partittionlujing
    let partition_path = webContents.session.getStoragePath()
    let {fileName} = tool_file_path_parse(partition_path)
    let partittion = "persist:" + fileName
    console.log(`partittion---:`, partittion)

    // 监听webview打开弹框
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

function protocol_cancel({webContents}) {
    try {
        webContents.session.protocol.registerFileProtocol('bitbrowser', (request, callback) => {
            console.log("protocol_cancel---111", request.url)
            // callback()
        })
        // webContents.session.protocol.handle('bitbrowser', (request) => {
        //     console.log("protocol_cancel---222", request)
        //     return false
        // })
        //
    } catch (error) {
        // console.log("protocol_cancel---333", error)
    }
}

