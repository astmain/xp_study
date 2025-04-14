const {app, BrowserWindow, ipcMain, session} = require("electron")
const axios = require("axios")
const puppeteer = require("puppeteer-core")
const Spider = require("./puppeteer/Spider")
const connect_puppeteer_electron = require("./connect_puppeteer_electron");


ipcMain.handle("IPC_spider_webview", async function (event, {webviewId}) {
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
    await spider.web_goto({desc: "页面跳转", url: "https://www.zhihu.com/zvideo/upload-video"})
    // await spider.start_wind_partition({desc: "页面跳转", url: "https://www.zhihu.com/zvideo/upload-video", webviewPartition: webviewPartition, show_browser, acc})

    // 基本操作
    await spider.web_input_files({desc: "上传视频文件", css: ".VideoUploadButton-fileInput", files: ["C:\\Users\\Administrator\\Desktop\\111.mp4"]})



    let words=["热门话题","热门话题","热门话题","热门话题",]
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        await spider.web_click_try({desc: "点击-话题", css: ".TopicInputAlias-placeholderButton"})
        await spider.web_input_text({desc: "输入-话题", css: ".TopicInputAlias-input", text: word})
        await new Promise((resolve) => setTimeout(resolve, 500))
        await spider.page.keyboard.press('Enter')
        await new Promise((resolve) => setTimeout(resolve, 500))
        await spider.web_click_try({desc: "点击-话题-其它让话题成功", css: ".VideoUploadForm-itemTitle--topic"})
    }



    return {msg: `提交成功`, isok: true, error: ``}
}


async function hook_dialog(spider) {
    // await spider.page.evaluateOnNewDocument(() => {
    //     window.alert = () => {
    //     };
    //     window.confirm = () => {
    //     };
    //     window.prompt = () => {
    //     };
    //     window.open = () => {
    //     };
    //     window.onbeforeunload = () => {
    //     }
    // })
    //
    // await spider.page.evaluate(() => {
    //     window.alert = () => {
    //     };
    //     window.confirm = () => {
    //     };
    //     window.prompt = () => {
    //     };
    //     window.open = () => {
    //     };
    //     window.onbeforeunload = () => {
    //     }
    // })


    // console.log(`弹框关闭---:`, 111)

}


