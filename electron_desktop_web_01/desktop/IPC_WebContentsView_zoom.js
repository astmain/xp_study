const {ipcMain, WebContentsView} = require("electron")
ipcMain.handle("IPC_WebContentsView_zoom", async function (event, {key, desc = "默认-设置缩放", value}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    console.log(`WebContentsView_manager[key]---:`, WebContentsView_manager[key])
     WebContentsView_manager[key].webContents.setZoomFactor(value)


    const result = {desc: `成功:${desc}`, key, value, IPC: "IPC_WebContentsView_zoom"}
    console.log(result)
    return result
})