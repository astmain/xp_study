const {ipcMain} = require("electron")
const Spider = require("./puppeteer/Spider")
const connect_puppeteer_electron = require("./connect_puppeteer_electron")

ipcMain.handle("IPC_spider_browserWindow", async function (event, {desc = "默认-执行脚本", partition, spider_script}) {


    // 2puppeteer会根据1向页面注入WebContentsView_key找到page
    const obj = await new connect_puppeteer_electron().get_page_browserWindow({partition})
    let spider = new Spider()
    spider.page = obj.page
    spider.browser = obj.browser
    spider.WINDspider = null

    // 3执行脚本
    let result_spider = await require(spider_script)({spider})

    // 返回结果
    const result = {desc: `成功:${desc}`, partition, spider_script, result_spider, IPC: "IPC_spider_BrowserWindow"}
    console.log(result)
    return result

})