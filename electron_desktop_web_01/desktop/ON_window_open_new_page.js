const {app, BrowserWindow, ipcMain, session, ipcRenderer} = require('electron')
// app拦截webview和webContents打开新窗口问题  参考文章https://blog.csdn.net/weixin_56295520/article/details/131826632

//当一个新的 webContents 被创建时触发。     //当渲染器使用 window.open 打开子窗口 进行拦截配置
app.on('web-contents-created', function (event, webContents) {
    // console.log(`getType---:`,     webContents  ,webContents.getType() )
    // console.log(`getURL---:`,     webContents.getURL() )
    // console.log(`getStoragePath---:`,    webContents.session.getStoragePath()   )
    webContents.setWindowOpenHandler((details) => {
        let file_path_partition = webContents.session.getStoragePath()
        webContents.session.getPreloads()

console.log(`webContents.session.getPreloads()---:`,     webContents.session.getPreloads()        )

        let partition_name = tool_file_path_parse(file_path_partition).fileName
        let partition = `persist:${partition_name}`
        main_window.webContents.send('ON_window_open_new_page', {url: details.url, partition: partition})
        return {action: 'deny'}//取消创建新窗口
    })

    // webContents.on('dom-ready', () => {
    //     let file_path_partition = webContents.session.getStoragePath()
    //     let partition_name = tool_file_path_parse(file_path_partition).fileName
    //     let partition = `persist:${partition_name}`
    //     console.log(`webContents---:`, "dom-ready " , partition  , webContents.getURL())
    //     webContents.executeJavaScript(`    (   ()=>{localStorage.setItem("my_partition",  ${partition}    )}   )()      `)
    // });
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