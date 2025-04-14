const axios = require("axios");
const puppeteer = require("puppeteer-core");
const {BrowserWindow} = require("electron");

class Connect_puppeteer_electron {
    //变量
    page = null         //当前页面
    WINDspider = null   //electron子窗口
    webSocketDebuggerUrl = ""
    targets = []
    browser = null


    // axios得到webSocketDebuggerUrl
    async get_webSocketDebuggerUrl() {
        const res = await axios("http://127.0.0.1:8400/json/version")
        // console.log(`res.data---:`, res.data)
        const webSocketDebuggerUrl = res?.data?.webSocketDebuggerUrl
        if (!webSocketDebuggerUrl) throw Error("防御性报错:Spider_puppeteer_electron---get_webSocketDebuggerUrl---获取失败")
        // console.log(`webSocketDebuggerUrl---:`, webSocketDebuggerUrl)
        this.webSocketDebuggerUrl = webSocketDebuggerUrl
        return webSocketDebuggerUrl
    }

    // 链接puppeteer_connect得到browser
    async get_browser() {
        this.browser = await puppeteer.connect({defaultViewport: null, browserWSEndpoint: this.webSocketDebuggerUrl})
        if (!this.browser) throw Error("防御性报错:Spider_puppeteer_electron---get_browser---获取失败")
        return this.browser
    }


    // 得到page通过webview
    async get_page_for_webview({webviewId}) {
        this.targets = this.browser.targets()
        let page = null
        for (let i = 0; i < this.targets.length; i++) {
            let PageTarget = this.targets[i]
            if (PageTarget.type() === "webview") {
                let PageTarget_web = await PageTarget?.page()
                let my_webviewId = await PageTarget_web.evaluate(() => localStorage.getItem("webviewId"))
                console.log(`my_webviewId---:`, my_webviewId)
                if (my_webviewId === webviewId) {
                    page = PageTarget_web
                    break
                }
            }
        }
        if (!page) throw Error("防御性报错:IPC_spider_webview---page---获取失败")
        return page
    }




    // 主方法得到page_webview
    async main_get_webview_page({webviewId}) {
        await this.get_webSocketDebuggerUrl()
        await this.get_browser()
        let page = await this.get_page_for_webview({webviewId: webviewId})
        return {browser: this.browser, page: page}
    }


    // 主方法得到page_webview
    async main_get_WebContentsView({key}) {
        await this.get_webSocketDebuggerUrl()
        await this.get_browser()
        let pages = await this.browser.pages()
        let page = null
        for (let i = 0; i < pages.length; i++) {
            let p = pages[i]
            let WebContentsView_key = await p.evaluate(`localStorage.getItem("WebContentsView_key" )   `)
            // console.log(`p.url()---:`, p.url())
            if (WebContentsView_key === key) {
                page = p
            }
        }

        if (!page) throw Error("防御性报错:IPC_set_WebContentsView_spider---page---获取失败")
        console.log(`IPC_WebContentsView_spider---找到----page.url():`, page.url())
        return {browser: this.browser, page: page}
    }

    async get_page_browserWindow({partition = "persist:douyin111"}) {
        let browserWindow = new BrowserWindow({
            parent: globalThis.main_window, //
            show: true, width: 1800, height: 1000, x: 0, y: 0, webPreferences: {
                partition,//
                webSecurity: false, allowDisplayingInsecureContent: true,//允许页面使用http资源(原本有些网站是只能只用https的资源)
                allowRunningInsecureContent: true,//允许该页面运行来自http的JavaScript、CSS或插件
                nodeIntegration: true,//
                contextIsolation: true, //
            }
        })


        let url = "about:blank?" + `ID=${new Date().getTime()}_${Math.floor(Math.random() * 999999)}`
        browserWindow.loadURL(url, {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"})

        await this.get_webSocketDebuggerUrl()
        await this.get_browser()
        let pages = await this.browser.pages()
        let page = null
        for (let i = 0; i < pages.length; i++) {
            let p = pages[i]
            // console.log(`p.url()---:`, p.url())
            if (p.url() === url) {
                page = p
            }
        }

        if (!page) throw Error("防御性报错:get_page_browserWindow---page---获取失败")
        console.log(`get_page_browserWindow---找到----page.url():`, page.url())
        return {browser: this.browser, page: page}
    }


}

module.exports = Connect_puppeteer_electron

