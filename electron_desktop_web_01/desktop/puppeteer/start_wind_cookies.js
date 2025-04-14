const {BrowserWindow, app} = require("electron");
const axios = require("axios");

module.exports = async function start_wind_cookies({desc, url, show_browser = true, cookies = [], acc, message = null}) {
    try {
        const {webSocketDebuggerUrl} = await get_webSocketDebuggerUrl()
        //puppeteer-core  核心库 todo 需要在使用的时候再引用，否则打包后项目启动会报错。原因未知！
        const puppeteer = await import("puppeteer-core") //puppeteer-core

        const {WINDspider, WINDspider_url} = await create_WINDspider({show_browser, acc_id: acc.id})//构造唯一值WINDspider_url
        const browser = await puppeteer.connect({defaultViewport: null, browserWSEndpoint: webSocketDebuggerUrl, args: ['--disable-cache']})
        const pages = await browser.pages()

        // 获取page
        let page
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].url() === WINDspider_url) {
                page = pages[i]
            }
        }
        if (!page) throw new Error("没有找到page!可能是端口不是唯一!或者其它愿意请排除")
        console.log(`成功:start_wind_cookies---333`, `page:${page}`)


        // 网页跳转
        await page.setCacheEnabled(false) //停用缓存
        for (let i = 0; i < cookies.length; i++) await page.setCookie(cookies[i])
        await page.goto(url, {'bypass': false})
        await page.waitForSelector("html", {timeout: 10 * 1000})
        await page.addScriptTag({url: 'https://dev.duochuangkeji.cn:5032/static/js/jq.js'})
        console.log(`成功:start_wind_cookies---444`, `desc:${desc}`, `url:${url}`)
        await new Promise((resolve) => setTimeout(resolve, 0.2 * 1000))


        // 类变量初始化
        this.page = page
        this.browser = browser
        this.WINDspider = WINDspider
        return this
    } catch (error) {
        console.error(`报错:start_wind_cookies`, `error:`, error)
        throw new Error(`报错:start_wind_cookies`)
    }

}


async function get_webSocketDebuggerUrl() {
    const webSocketDebuggerRes = await axios(`http://127.0.0.1:${app.remoteDebuggingPort}/json/version`)
    const webSocketDebuggerUrl = webSocketDebuggerRes.data?.webSocketDebuggerUrl
    console.log(`成功:start_wind_cookies---111`, `webSocketDebuggerUrl:${webSocketDebuggerUrl}`)
    return {webSocketDebuggerUrl}
}


async function create_WINDspider({show_browser, acc_id}) {
    const WINDspider = new BrowserWindow({
        show: show_browser, //
        width: 1800, height: 1000, x: 100, y: 0, //
        parent: app.mainWindow, //
        webPreferences: {
            nodeIntegration: true,//
            contextIsolation: true,//
        }
    })

    let WINDspider_url = `about:blank?acc_id=${acc_id}`
    WINDspider.loadURL(WINDspider_url, {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"})
    // WINDspider.webContents.openDevTools({mode: 'right'})
    console.log(`成功:start_wind_cookies---222`, `WINDspider_url:${WINDspider_url}`)
    return {WINDspider, WINDspider_url}

}

