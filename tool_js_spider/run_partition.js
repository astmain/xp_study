const puppeteer = require("puppeteer-core")
const axios = require("axios")


module.exports = async function run_partition({desc = "启动-spider", partition,BrowserWindow, show = false}) {
    try {
        let url = "about:blank?" + `ID=${new Date().getTime()}_${Math.floor(Math.random() * 999999)}`

        // 打开窗口persist
        const wind = new BrowserWindow({width: 1600, height: 900, x: 0, y: 0, webPreferences: {partition: partition, nodeIntegration: true, contextIsolation: true, webviewTag: true}})
        wind.loadURL(url, {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"})

        // webSocketDebuggerUrl
        const webSocketDebuggerRes = await axios("http://127.0.0.1:8400/json/version"  , {timeout: 3000})
        const webSocketDebuggerUrl = webSocketDebuggerRes?.data?.webSocketDebuggerUrl
        if (!webSocketDebuggerUrl) {
            throw "pupppeterr失败原因---webSocketDebuggerUrl"
        }


        // 连接窗口page

        const browser = await puppeteer.connect({defaultViewport: null, browserWSEndpoint: webSocketDebuggerUrl, args: ["--disable-cache"]})
        const pages = await browser.pages()
        const page = pages.find((p) => p.url() === url)
        if (!page) {
            throw "pupppeterr失败原因---page"
        }


        this.wind = wind
        this.page = page
        console.log(`成功:`,{desc , partition,BrowserWindow, show },"---run_partition")
        return page
    } catch (error) {
        console.error("报错:", error,"---run_partition")
        throw new Error(`报错:${desc}---run_partition`)
    }

}
