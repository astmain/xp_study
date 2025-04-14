const {app, BrowserWindow, ipcMain, session} = require("electron")
const axios = require("axios")
const puppeteer = require("puppeteer-core")
const Spider = require("./puppeteer/Spider")
const connect_puppeteer_electron = require("./connect_puppeteer_electron");


ipcMain.handle("IPC_spider_electron", async function (event, {webviewId}) {
    let spider = new Spider()
    try {
        let obj = await new connect_puppeteer_electron().main_get_webview_page({webviewId})
        spider.page = obj.page
        spider.browser = obj.browser
        spider.WINDspider = null


        // 自动发布
        return await auto_publish({spider})
    } catch (error) {
        console.log(`error---:`, error)
        return {msg: `提交失败`, isok: true, error: error}
    } finally {

    }


})


async function auto_publish({spider}) {
    // 知乎
    await spider.page.goto(`https://www.zhihu.com/zvideo/upload-video`)
    // await spider.web_input_files({desc: "上传视频文件", css: ".VideoUploadButton-fileInput", files: ["C:\\Users\\Administrator\\Desktop\\111.mp4"]})
    // 文件代码修改
    await spider.web_wait_css({desc: "点击快手图文按钮并拦截文件选择器(快手问题的特殊处理)", css: ".VideoUploadButton-fileInput", timeout: 10 * 1000})
    await Promise.all([spider.page.waitForFileChooser(), spider.web_click_try({desc:"111",css:`.VideoUploadButton-fileInput`})])
    await spider.web_input_files({desc: "上传视频文件", css: ".VideoUploadButton-fileInput", files: ["C:\\Users\\Administrator\\Desktop\\111.mp4"]})

    await spider.web_input_text({desc: "输入标题", css: "input[placeholder='输入视频标题']", text: "我的作品标题"})
    await spider.web_input_text({desc: "输入内容", css: "textarea[class*='Input ']", text: "我的内容"})




    // // 快手
    // await spider.page.goto(`https://cp.kuaishou.com/article/publish/video?tabType=2`)
    // await spider.web_wait_css({desc: "点击快手图文按钮并拦截文件选择器(快手问题的特殊处理)", css: "[id*='2']  [class*='_upload-text']  button", timeout: 10 * 1000})
    // await Promise.all([spider.page.waitForFileChooser(), spider.web_click_try({desc:"111",css:`[id*='2']  [class*='_upload-text']  button`})])
    // await spider.web_input_files({desc: "图片文件上传", css: `input[accept*='image/png, image/jpg, image/jpeg, image/webp']`, files:  ["C:\\Users\\Administrator\\Desktop\\111.png"]})
    // await spider.web_input_text({desc: "输入内容", css: "[class*='_edit-desc-container_'] ", text: "我的", })



    await spider.page.goto(`https://www.baidu.com`)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    await spider.page.goto(`https://www.bing.com`)




    return {msg: `提交成功`, isok: true, error: ``}
}

