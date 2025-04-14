const {ipcMain, WebContentsView, webFrameMain, app} = require("electron")


ipcMain.handle("IPC_WebContentsView_manager_info", async function (event, {desc = "默认-IPC_WebContentsView_manager_info"}) {
    // require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    let info = {}
    for (const key in globalThis.WebContentsView_manager) {
        const {height, width, x, y,} = WebContentsView_manager[key].getBounds()
        info[key] = {key, height, width, x, y,}
    }
    const result = {desc: `成功:${desc}`, info, IPC: "IPC_WebContentsView_manager_info"}
    console.log(result)
    return result


})




