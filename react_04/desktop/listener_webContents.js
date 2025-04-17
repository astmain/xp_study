// app拦截webview和webContents打开新窗口  参考文章https://blog.csdn.net/weixin_56295520/article/details/131826632
const { app, BrowserWindow, ipcMain, session, ipcRenderer } = require('electron')
app.on('web-contents-created', function (event, webContents) {
	if (webContents.getType().includes("webview")) {
		webContents.setWindowOpenHandler((details) => {
			// console.log(`details---:`, details)
			webContents.loadURL(details.url)
			return { action: 'deny' }//取消创建新窗口
		})
	}
})


