const {ipcMain, WebContentsView, webFrameMain, app} = require("electron")


ipcMain.handle("IPC_WebContentsView_size_x", async function (event, {desc = "默认-设置坐标x", key, x}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    let size_old = globalThis.WebContentsView_manager[key].getBounds()
    let size_new = {...size_old, x}
     globalThis.WebContentsView_manager[key].setBounds(size_new)
    const result = {desc: `成功:${desc}`, key, x, size_old, size_new, IPC: "IPC_WebContentsView_size_x"}
    console.log(result)
    return result
})




