const {ipcMain, WebContentsView, webFrameMain, app} = require("electron")


ipcMain.handle("IPC_WebContentsView_size_height", async function (event, {desc = "默认-设置坐标height", key, height}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    let size_old = globalThis.WebContentsView_manager[key].getBounds()
    let size_new = {...size_old, height}
       globalThis.WebContentsView_manager[key].setBounds(size_new)
    const result = {desc: `成功:${desc}`, key, height, size_old, size_new, IPC: "IPC_WebContentsView_size_height"}
    console.log(result)
    return result
})




