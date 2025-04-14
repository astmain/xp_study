const {ipcMain, WebContentsView, webFrameMain, app} = require("electron")


ipcMain.handle("IPC_WebContentsView_goto", async function (event, {desc = "默认-页面跳转", key, url}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    await globalThis.WebContentsView_manager[key].webContents.loadURL(url, {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36'})
    const result = {desc: `成功:${desc}`, key, url ,IPC: "IPC_WebContentsView_goto"}
    console.log(result)
    return result
})




