const {BrowserWindow, app} = require("electron")
const axios = require("axios")
const path = require('path')
const fs = require('fs')
const {Pptr} = require("../../../utils/pptr");
module.exports = async function start_wind_partition({url, webviewPartition, show_browser}) {
    try {

        //构造参数
        // url = url.includes("?") ? `${url}&acc_id=${acc.id}` : `${url}?acc_id=${acc.id}`//唯一url
        // console.log(`成功:start_wind_partition---111---构造参数:`, {show_browser, url})
        //
        // let {x, y} = PotionXY()// Spider窗口位置随机生成
        //
        // const puppeteer = require("puppeteer-core") //puppeteer-core  核心库 todo 需要在使用的时候再引用，否则打包后项目启动会报错。原因未知！
        //
        // // 打开新窗口partition.persist
        // const WINDspider = new BrowserWindow({
        //     show: show_browser, width: 1800, height: 1000, x: x, y: y, parent: app.mainWindow, webPreferences: {
        //         webSecurity: false, allowDisplayingInsecureContent: true,//允许页面使用http资源(原本有些网站是只能只用https的资源)
        //         allowRunningInsecureContent: true,//允许该页面运行来自http的JavaScript、CSS或插件
        //         nodeIntegration: true,//
        //         contextIsolation: true, //
        //         partition: webviewPartition,//
        //     }
        // })
        // WINDspider.loadURL(url, {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"})
        // this.WINDspider = WINDspider
        //
        // // 获取electron的webSocketDebuggerUrl链接为了puppeteer-core能链接
        // const webSocketDebuggerRes = await axios(`http://127.0.0.1:${app.remoteDebuggingPort}/json/version`)
        // // 检查webSocketDebuggerUrl
        // const webSocketDebuggerUrl = webSocketDebuggerRes.data?.webSocketDebuggerUrl
        // if (webSocketDebuggerUrl) {
        //     console.log(`成功:start_wind_partition---222---webSocketDebuggerUrl:${webSocketDebuggerUrl}`)
        // } else {
        //     throw `报错:链接webSocketDebuggerUrl失败:${webSocketDebuggerUrl}`
        // }
        //
        // // puppeteer链接electron
        // console.log(`驱动对象---puppeteer---:`, puppeteer)
        // const browser = await puppeteer.connect({defaultViewport: null, browserWSEndpoint: webSocketDebuggerUrl, args: ['--disable-cache']})
        // this.browser = browser
        // // 检查page
        // const page = await check_page({browser, url})
        // if (page) {
        //     console.log(`成功:start_wind_partition---333---page:${page}`)
        // } else {
        //     throw `报错:没有找到page:${page},可能账号登陆失效,导致页面重定向`
        // }
        //
        //
        // // Spider类变量初始化
        // this.page = page


        // Spider类变量初始化
        let pptr = await new Pptr({url, partition: webviewPartition, show: show_browser})
        this.page = pptr.page
        this.WINDspider = pptr.browserWindow


        /// 拦截响应on"request","response"必须同时使用
        // await this.page.setRequestInterception(true)
        // this.page.on('request', request => request.continue())

        return this
    } catch (error) {
        console.error(`报错:start_wind_partition`, `error:`, error)
        throw error
    }

}


// 生成WINDspider窗口随机位置
function PotionXY() {
    let x = Math.floor(Math.random() * 100) + 1;
    let y = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < 99999; i++) {
        if (x === app.SpiderPosition.x && y === app.SpiderPosition.y) {
            x = Math.floor(Math.random() * 100) + 1;
            y = Math.floor(Math.random() * 100) + 1;
        } else {
            app.SpiderPosition.x = x
            app.SpiderPosition.y = y
            return {x, y}
        }
    }
}

// 检查page
async function check_page({browser, url}) {
    let page

    // 检查10次pages中是否有url等于page_item.url()的page,满条件退出检查
    for (let i = 0; i < 10; i++) {
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        const pages = await browser.pages()
        page = pages.find(page_item => {
            if (page_item.url() === url) {
                page = page_item
                return true
            } else {
                return false
            }
        })
        if (page) break

    }

    // 最后判断page是否存在,返回page或者报错throw
    if (page) {
        const jq_path = path.join(app.indexDir, 'static/js/jq.js');
        const exists = fs.existsSync(jq_path);
        if (exists === false) throw new Error("jq依赖包文件不存在")
        await page.addScriptTag({path: jq_path})
        return page
    } else {
        return null
    }

}


