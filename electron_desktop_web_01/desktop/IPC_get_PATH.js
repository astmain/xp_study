const {ipcMain, session, app} = require("electron")
const fs = require("fs")
const path = require("path")

globalThis.PATH = {}
globalThis.PATH["project"] = app.getPath("userData")
globalThis.PATH["logo"] = path.join(PATH["project"], "logo.png")
globalThis.PATH["preload"] = path.join(PATH["project"], "preload.js")



// 复制图标
fs.copyFileSync(path.join(__dirname, "./logo.png"), PATH["logo"])


// 复制preload脚本
fs.copyFileSync(path.join(__dirname, "./preload.js"), PATH["preload"])

ipcMain.handle('IPC_get_PATH', async (event, args) => {
    return globalThis.PATH
})
