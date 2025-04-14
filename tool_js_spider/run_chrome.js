const puppeteer = require('puppeteer-core')
const axios = require('axios')

module.exports = async function run_chrome({desc = '启动-spider', path_chrome = '', path_user_dir = "", show = false}) {
    try {
        let browser = await puppeteer.launch({
            devtools: true,               //控制台
            headless: !show,              //不使用无头模式，可以看到浏览器界面
            executablePath: path_chrome,  //浏览器路径
            userDataDir: path_user_dir,   //用户路径可以持久化用户数据
            defaultViewport: {width: 1920, height: 1080}
        })
        let pages = await browser.pages()

        // 赋值给Spider的this
        this.page = pages[0]
        this.browser = browser
        // console.log(`成功:`,{desc, path_chrome , path_user_dir, show }, "---run_chrome")
        console.log(`成功:`, {desc, show}, "---run_chrome")
        return this
    } catch (error) {
        console.error('报错:', error, '---run_chrome')
        throw new Error(`报错:${desc}---run_chrome`)
    }
}
