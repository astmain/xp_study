const {ipcMain, session, app} = require("electron")
const fs = require("fs")
const path = require("path")

// globalThis.PATH = {}
globalThis['PATH'] = {}
globalThis.PATH["project"] = app.getPath("userData")
globalThis.PATH["logo"] = path.join(globalThis.PATH["project"], "logo.png")
globalThis.PATH["preload"] = path.join(globalThis.PATH["project"], "preload.js")


// 复制图标
fs.copyFileSync(path.join(__dirname, "../logo.png"), globalThis.PATH["logo"])


// 复制preload脚本
fs.copyFileSync(path.join(__dirname, "../preload.js"), globalThis.PATH["preload"])

ipcMain.handle('IPC_get_PATH', async (event, args) => {
    return globalThis.PATH
})


console.log(`程序路径 ==============================`)
console.log(globalThis.PATH.logo)
console.log(globalThis.PATH.project)
console.log(globalThis.PATH.preload)
