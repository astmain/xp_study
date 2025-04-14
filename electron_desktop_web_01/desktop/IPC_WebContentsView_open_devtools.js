// 设置参数_WebContentsView
const {ipcMain, WebContentsView} = require("electron")

ipcMain.handle("IPC_WebContentsView_open_devtools", async function (event, {desc = "默认-打开控制台", key, show = true}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
      globalThis.WebContentsView_manager[key].webContents.openDevTools()
    const result = {desc: `成功:${desc}`, key, show, IPC: "IPC_WebContentsView_open_devtools"}
    console.log(result)
    return result
})