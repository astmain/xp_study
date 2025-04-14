const {app, BrowserWindow, ipcMain, session} = require("electron")
const axios = require("axios")
const puppeteer = require("puppeteer-core")
const Spider = require("./puppeteer/Spider")


ipcMain.handle("IPC_spider_browder_wind", async function (event, {id}) {
    let spider = new Spider()
    try {
        const WINDspider = new BrowserWindow({
            parent: globalThis.main_window, show: true, width: 1800, height: 1000, x: 0, y: 0, webPreferences: {
                webSecurity: false, allowDisplayingInsecureContent: true,//允许页面使用http资源(原本有些网站是只能只用https的资源)
                allowRunningInsecureContent: true,//允许该页面运行来自http的JavaScript、CSS或插件
                nodeIntegration: true,//
                contextIsolation: true, //
                partition: "persist:douyin111",//
            }
        })
        WINDspider.loadURL("about:blank", {userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"})

        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios("http://127.0.0.1:8400/json/version")
        console.log(`res.data---:`, res.data)
        const webSocketDebuggerUrl = res?.data?.webSocketDebuggerUrl
        if (!webSocketDebuggerUrl) throw Error("防御性报错:IPC_spider_webview---webSocketDebuggerUrl获取失败")
        console.log(`webSocketDebuggerUrl---:`, webSocketDebuggerUrl)

        let page = null
        let browser = await puppeteer.connect({defaultViewport: null, browserWSEndpoint: webSocketDebuggerUrl})
        let pages = await browser.pages()
        for (let i = 0; i < pages.length; i++) {
            let p = pages[i]
            if (p.url() === "about:blank") {
                page = p
                console.log(`找到了---p---:`, p.url(), p)
                break
            }
        }


        console.log(`page---:`, page)

        // 构造spider

        spider.page = page
        spider.browser = browser
        spider.WINDspider = WINDspider

        // 自动发布
        return await auto_publish({spider})
    } catch (error) {
        console.log(`error---:`, error)
        return {msg: `提交失败`, isok: true, error: error}
    } finally {

    }


})


async function auto_publish({spider}) {
    await spider.page.goto(`https://www.zhihu.com/zvideo/upload-video`)
    await spider.web_input_files({desc: "上传视频文件", css: ".VideoUploadButton-fileInput", files: ["C:\\Users\\Administrator\\Desktop\\111.mp4"]})
    await spider.web_input_text({desc: "输入标题", css: "input[placeholder='输入视频标题']", text: "我的作品标题"})
    await spider.web_input_text({desc: "输入内容", css: "textarea[class*='Input ']", text: "我的内容"})
    await spider.page.goto(`https://www.baidu.com`)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    await spider.page.goto(`https://www.bing.com`)


    return {msg: `提交成功`, isok: true, error: ``}
}

