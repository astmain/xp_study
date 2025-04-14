const {ipcMain, WebContentsView} = require("electron")

ipcMain.handle("IPC_WebContentsView_size", async function (event, {desc = "默认设置size", key, x, y, width, height}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
       WebContentsView_manager[key].setBounds({x, y, width, height})

    const result = {desc: `成功:${desc}`, key, x, y, width, height, IPC: "IPC_WebContentsView_size"}
    console.log(result)
    return result

})