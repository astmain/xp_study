const {BrowserWindow, app} = require("electron")
const axios = require("axios")
const path = require('path')

module.exports = async function web_goto({desc = "网页跳转", url = "https://cn.bing.com/"}) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        await this.page.goto(url)
        console.log(`成功:`, {desc, url},"---goto")
    } catch (error) {
        console.error("报错:", error,"---goto")
        throw new Error(`报错:${desc}---goto`)
    }
}

