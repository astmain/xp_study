const Spider = require("./Spider");
const fs = require("fs");
const path = require("path");
module.exports = async function web_clipboard_copy_html({desc = "剪贴板-复制-html", html, show_browser = false}) {
    let spider_temp = new Spider()
    let only_id = `only_id${new Date().getTime()}_${Math.floor(Math.random() * 999999999)}`

    // 判断是否有项目创小二的globalThis.XIAOER_tempPath临时路径,如果内有就是用c盘的路径
    let file_temp_path = ""
    if (globalThis.XIAOER_tempPath) {
        file_temp_path = path.join(globalThis.XIAOER_tempPath, `AAA_rich_html_${only_id}.html`)////临时文件名使用唯一id
    } else {
        file_temp_path = `C:/AAA_rich_html_${only_id}.html`//临时文件名使用唯一id
    }


    try {
        fs.writeFileSync(file_temp_path, html)//文件写
        const file_url = "file:///" + file_temp_path   // "file:///" + "C:/Users/Administrator/Desktop/111.html"
        await spider_temp.start_wind_partition({desc: "跳转本地文件页面", url: "about:blank", webviewPartition: "spider_temp", show_browser})
        await spider_temp.page.goto(file_url)
        await spider_temp.page.evaluate(() => document.execCommand("selectAll"))
        await spider_temp.page.evaluate(() => document.execCommand("copy"))

        console.log(`成功:`, desc)
    } catch (error) {
        console.error(`报错:${desc}`, `error:`, error)
        throw Error(error)
    } finally {
        if (spider_temp.WINDspider && spider_temp.WINDspider.close && spider_temp.WINDspider.destroy) {
            await spider_temp.WINDspider.close()
            await spider_temp.WINDspider.destroy()
        } else {
            console.error("spider_temp.WINDspider对象不存在,可能是puppeteer链接")
        }
        fs.unlinkSync(file_temp_path)//文件删除
    }
}






