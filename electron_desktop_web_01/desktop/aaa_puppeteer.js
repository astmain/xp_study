const puppeteer = require('puppeteer');
const Spider = require('./puppeteer/Spider');


main()

async function main() {
    const browser = await puppeteer.launch({
        // 指定浏览器路径
        executablePath: "D:\\AAA\\my_desktop\\chrome简易版浏览器Chrome Portable\\App\\Chrome-bin\\chrome.exe", // 指定用户目录
        userDataDir: "C:\\AAA", headless: false,//
        devtools: true, // "defaultViewport": {},
        args: ['', '--no-sandbox', '--disable-gpu', '--log-level=3',  //# 日志等级
            '--disable-infobars',  //# 关闭提示
            // '--window-size={},{}'.format(1400, 950),
            "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",]
    });
    console.log(`111---:`, 111)

    // const page = await browser.newPage();
    const [page] = await browser.pages();
    await page.setViewport({width: 1024, height: 768});



    // 构建spider参数
    let spider = new Spider()

    spider.page = page
    spider.browser = browser

    // puppeteer 禁用 离开此网站？系统可能不会保存您所做的更改。



    // page.on("dialog",async dialog=>{
    //     await dialog.dismiss()
    // })



    await hook_dialog(spider)


    await spider.page.goto(`https://www.zhihu.com/zvideo/upload-video`)


    await hook_dialog(spider)

    await new Promise((resolve) => setTimeout(resolve, 3000))
    const element_file = await spider.page.waitForSelector(".VideoUploadButton-fileInput", {timeout: 30000})


    await hook_dialog(spider)


    await element_file.uploadFile(...["C:\\Users\\Administrator\\Desktop\\111.mp4"])
    console.log(`成功:上传-文件:`, 111)

    page.on("dialog",async dialog=>{
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log(`Found dialog. Type: ${dialog.type()}, message: ${dialog.message()}`); // get
        // page.wait
        await    dialog.accept()
        // await dialog.dismiss()
    })
    await page.addScriptTag({ content: 'window.onbeforeunload = (evt) => { evt.preventDefault(); evt.returnValue = ""}' })


    await hook_dialog(spider)

    const element_title = await spider.page.waitForSelector("input[placeholder='输入视频标题']", {timeout: 30000})
    element_title.type("我的标题")
    console.log(`成功:输入-标题:`, 222)

    await hook_dialog(spider)


    await spider.web_click_try({desc: "点击-原创", css: "xpath=//*[@class='VideoUploadForm-radioLabel' and contains(text(),'原创')]   "})
    await hook_dialog(spider)

    let classify = ["生活", "日常"]
    for (let i = 0; i < classify.length; i++) {
        let value = classify[i]
        await spider.web_click_try({desc: "点击-领域1", css: "xpath=//*[contains(@class,'Button') and contains(text(),'选择领域')]    "})
        await spider.web_click_try({desc: "尝试点击", css: `xpath=//*[contains(@class,'Select-option') and contains(text(),'${value}')] `, timeout: 5000})
    }

    await spider.web_click_try({desc: "点击-话题", css: ".TopicInputAlias-placeholderButton"})
    await spider.web_input_text({desc: "输入-话题", css: ".TopicInputAlias-input", text: "热门话题"})
    await spider.page.keyboard.press('Enter')
    await spider.web_click_try({desc: "点击-话题-其它让话题成功", css: ".VideoUploadForm-itemTitle--topic"})


    // await spider.web_click({desc: "点击_发布按钮", css: ".VideoUploadForm-submitButton"})
    await hook_dialog(spider)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    await hook_dialog(spider)
    await spider.page.goto(`https://www.baidu.com`)


    await new Promise((resolve) => setTimeout(resolve, 1000000))
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
    //
    //
    // console.log(`弹框关闭---:`, 111)

}
