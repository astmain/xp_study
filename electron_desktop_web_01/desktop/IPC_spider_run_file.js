const {app, BrowserWindow, ipcMain, session} = require("electron")
const axios = require("axios")
const fs = require("fs")
const puppeteer = require("puppeteer-core")
const Spider = require("./puppeteer/Spider")
const connect_puppeteer_electron = require("./connect_puppeteer_electron")


ipcMain.handle("IPC_spider_run_file", async function (event, {webviewId}) {
    let spider = new Spider()
    try {
        let obj = await new connect_puppeteer_electron().main_get_webview_page({webviewId})
        spider.page = obj.page
        spider.browser = obj.browser
        spider.WINDspider = null

        //// 自动发布########################
        // return await auto_publish({spider})

        //// eval代码########################
        // let func_str = fs.readFileSync("C:\\Users\\Administrator\\Desktop\\func_auto_publish.js", 'utf8')
        // let result = await eval(`(${func_str})()`)
        // console.log(`result---:`, result)


        //// eval代码########################
        let func_str = fs.readFileSync("C:\\Users\\Administrator\\Desktop\\func_auto_publish_word.js", 'utf8')
        let params = {word: "java开发"}
        let params_str = JSON.stringify(params)
        let result = await eval(`(${func_str})(${params_str})`)
        console.log(`result---:`, result)


    } catch (error) {
        console.log(`error---:`, error)
        return {msg: `提交失败`, isok: true, error: error}
    } finally {

    }


})


async function auto_publish({spider}) {
    await spider.page.goto(`https://www.baidu.com`)
    await spider.web_input_text({desc: "输入-关键词", css: "#kw", text: "android开发"})
    await spider.web_click({desc: "点击-搜索按钮", css: "#su"})
    return {msg: `提交成功`, isok: true, error: ``}
}


// async function func_auto_publish() {
//     await spider.page.goto(`https://www.baidu.com`)
//     await spider.web_input_text({desc: "输入-关键词", css: "#kw", text: "android开发"})
//     await spider.web_click({desc: "点击-搜索按钮", css: "#su"})
//     return {msg: `提交成功`, isok: true, error: ``}
// }


// async function func_auto_publish({ word }) {
//     await spider.page.goto(`https://www.baidu.com`)
//     await spider.web_input_text({ desc: "输入-关键词", css: "#kw", text: word })
//     await spider.web_click({ desc: "点击-搜索按钮", css: "#su" })
//     return { msg: `提交成功`, isok: true, error: `` }
// }
