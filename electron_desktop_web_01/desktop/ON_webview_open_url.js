const {app, BrowserWindow, ipcMain, session, ipcRenderer} = require('electron')
// app拦截webview和webContents打开新窗口问题  参考文章https://blog.csdn.net/weixin_56295520/article/details/131826632

//当一个新的 webContents 被创建时触发。     //当渲染器使用 window.open 打开子窗口 进行拦截配置
// app.on('web-contents-dom-ready', function (event, webContents) {
app.on('web-contents-created', function (event, webContents) {
    if (webContents.getType().includes("webview")) {
        // console.log(`getType---:`, webContents, webContents.getType())
        // console.log(`getURL---:`, webContents.getURL())
        // console.log(`getTitle ---:`, webContents.getTitle())
        let file_path_partition = webContents.session.getStoragePath()
        let getPreloads = webContents.session.getPreloads()
        let getUserAgent = webContents.session.getUserAgent()

        // console.log(`file_path_partition---:`,     file_path_partition        )
        // console.log(`getPreloads---:`,     getPreloads        )
        // console.log(`getUserAgent---:`,     getUserAgent        )



        webContents.setWindowOpenHandler((details) => {
            console.log(`details---:`, details)
            webContents.loadURL(details.url)
            return {action: 'deny'}//取消创建新窗口
        })
    }
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


