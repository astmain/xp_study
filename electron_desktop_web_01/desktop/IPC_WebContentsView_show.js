const {ipcMain, WebContentsView} = require("electron")
// 显示隐藏_WebContentsView
//参数表 https://blog.csdn.net/qq_29069649/article/details/136417393
ipcMain.handle("IPC_WebContentsView_show", async function (event, {desc = "默认-显示隐藏", key, show = true}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    await WebContentsView_manager[key].setVisible(show)
    let aaa = WebContentsView_manager[key]
    let aaa0 = WebContentsView_manager[key].webContents
    let aaa1 = WebContentsView_manager[key].backgroundThrottling
    let aaa2 = WebContentsView_manager[key].webContents.backgroundThrottling
    let aaa3 = WebContentsView_manager[key].webContents
    let aaa4 = WebContentsView_manager[key].webContents.getBackgroundThrottling()
    let aaa5 = WebContentsView_manager[key].webContents.setBackgroundThrottling({width:500,height:500,x:100,y:100})
    let aaa6 = WebContentsView_manager[key].webContents.offscreen
    let aaa7 = WebContentsView_manager[key].offscreen
    let aaa8 = WebContentsView_manager[key].setContentBounds
    let aaa9 = WebContentsView_manager[key].webContents.setContentBounds
    const result = {desc: `成功:${desc}`, key, show, IPC: "IPC_WebContentsView_show"}
    console.log(result)
    return result
})