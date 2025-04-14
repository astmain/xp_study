const {ipcMain, WebContentsView, webFrameMain, app} = require("electron")


ipcMain.handle("IPC_WebContentsView_size_y", async function (event, {desc = "默认-设置坐标y", key, y}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    let size_old = globalThis.WebContentsView_manager[key].getBounds()
    let size_new = {...size_old, y}
    globalThis.WebContentsView_manager[key].setBounds(size_new)

    // 返回结果
    const result = {desc: `成功:${desc}`, key, y, size_old, size_new, IPC: "IPC_WebContentsView_size_y"}
    console.log(result)
    return result
})




