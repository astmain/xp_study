let Spider = require('../Spider')

test1_chrome()

async function test1_chrome() {
    let spider = new Spider()
    // path_chrome    要注意在Chrome-bin中
    // path_user_dir  可以持久化用户数据
    let config = {show: true, path_chrome: 'D:\\AAA\\my_desktop\\chrome简易版浏览器Chrome Portable\\App\\Chrome-bin\\chrome.exe' ,path_user_dir:'C:\\AAA_pyppeteer111' }
    await spider.run_chrome(config)
    await spider.web_goto({desc: '网页跳转', url: 'https://cn.bing.com/'})
    new Spider()
}
