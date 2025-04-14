const {ipcMain, WebContentsView, webFrameMain, app} = require("electron")


ipcMain.handle("IPC_WebContentsView_size_width", async function (event, {desc = "默认-设置坐标width", key, width}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    let size_old = globalThis.WebContentsView_manager[key].getBounds()
    let size_new = {...size_old, width}
       globalThis.WebContentsView_manager[key].setBounds(size_new)
    const result = {desc: `成功:${desc}`, key, width, size_old, size_new, IPC: "IPC_WebContentsView_size_width"}
    console.log(result)
    return result
})




