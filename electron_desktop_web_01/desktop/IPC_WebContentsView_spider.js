const {ipcMain} = require("electron")
const Spider = require("./puppeteer/Spider")
const connect_puppeteer_electron = require("./connect_puppeteer_electron")

ipcMain.handle("IPC_WebContentsView_spider", async function (event, {desc = "默认-执行脚本", key, spider_script}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key

    // 1向页面注入WebContentsView_key
    await WebContentsView_manager[key].webContents.executeJavaScript(`localStorage.setItem("WebContentsView_key","${key}"  )   `)

    // 2puppeteer会根据1向页面注入WebContentsView_key找到page
    const obj = await new connect_puppeteer_electron().main_get_WebContentsView({key})
    let spider = new Spider()
    spider.page = obj.page
    spider.browser = obj.browser
    spider.WINDspider = null

    // 3执行脚本
    let result_spider = await require(spider_script)({spider})

    // 返回结果
    const result = {desc: `成功:${desc}`, key, spider_script, result_spider, IPC: "IPC_WebContentsView_spider"}
    console.log(result)
    return result

})