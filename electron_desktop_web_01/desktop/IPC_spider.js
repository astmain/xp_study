const {app, BrowserWindow, ipcMain, session} = require("electron")
const axios = require("axios")
const puppeteer = require("puppeteer-core")


let browser = null//puppeter的浏览器对象
let spider_position_x = 0
let spider_position_y = 0


ipcMain.handle("IPC_spider", async function (event, {persist, url, show = false}) {
    // 创建WINDspider
    const id_single = `id_single${new Date().getTime()}_${Math.floor(Math.random() * 999999)}`
    const url_blank = `about:blank?id_single=${id_single}`
    const {x, y} = spider_position_random_x_y()
    const WINDspider = new BrowserWindow({show, width: 1600, x, y, height: 900, webPreferences: {partition: persist, nodeIntegration: true, contextIsolation: true, webviewTag: true}})
    await WINDspider.loadURL(url_blank, {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"})

    // 找到page页面
    const pages = await browser.pages()
    const page = pages.find((p) => p.url() === url_blank)

    // 其它操作
    await page.goto(url)
    const html = await page.content()
    console.log(`html.slice(0,200)---:`, html.slice(0, 200))
    return {persist, url}

})


puppeteer_connect_webSocketDebuggerUrl()

async function puppeteer_connect_webSocketDebuggerUrl() {
    await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
    const {data: {webSocketDebuggerUrl}} = await axios("http://127.0.0.1:8400/json/version")    // 得到webSocketDebuggerUrl
    browser = await puppeteer.connect({defaultViewport: null, browserWSEndpoint: webSocketDebuggerUrl, args: ["--disable-cache"]})// puppeteer_connect链接
}


// 生成WINDspider窗口随机位置
function spider_position_random_x_y() {
    let x = Math.floor(Math.random() * 100) + 1;
    let y = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < 99999; i++) {
        if (x === spider_position_x && y === spider_position_y) {
            x = Math.floor(Math.random() * 100) + 1;
            y = Math.floor(Math.random() * 100) + 1;
        } else {
            spider_position_x = x
            spider_position_y = y
            return {x, y}
        }
    }
}