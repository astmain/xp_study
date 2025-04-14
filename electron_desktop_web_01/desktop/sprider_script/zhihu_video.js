module.exports = async function zhihu_video({spider}) {
    await WebContentsView_manager[".account1"].setVisible(true)
    await WebContentsView_manager[".account1"].setVisible(false)
    spider.FuncBefore = [func_no_dialog_before,func_WebContentsView_show]
    await spider.web_goto({desc: "页面跳转", url: "https://www.baidu.com/"})
    await spider.web_goto({desc: "页面跳转", url: "https://www.zhihu.com/zvideo/upload-video"})
    await WebContentsView_manager[".account1"].setVisible(true)
    await WebContentsView_manager[".account1"].setVisible(false)


    // await spider.page.bringToFront()//  # 激活指定的页面





    // 基本操作
    await spider.web_input_files({desc: "上传视频文件", css: ".VideoUploadButton-fileInput", files: ["C:\\Users\\Administrator\\Desktop\\111.mp4"]})
    // await spider.page.evaluate(func_no_dialog)
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    console.log(`准备输入话题---:`)
    let words = ["热门话题", "热门专业", "朋友圈热门话题",]
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        await spider.web_click_try({desc: "点击-话题", css: ".TopicInputAlias-placeholderButton", visible: false})
        await screenshot({spider, img_name: `img${i}_点击-话题`})
        await spider.web_input_text({desc: "输入-话题", css: ".TopicInputAlias-input", text: word})
        await screenshot({spider, img_name: `img${i}_输入-话题`})
        await spider.page.keyboard.press('Enter')
        await spider.web_click_try({desc: "点击-话题-其它让话题成功", css: ".VideoUploadForm-itemTitle--topic"})
        await screenshot({spider, img_name: `img${i}_点击-话题-其它让话题成功`})
    }
    // await spider.page.evaluate(func_no_dialog)

    let result = {msg: `提交成功`, isok: true, error: ``}
    console.log(`result---:`, result)
    // await spider.page.close()
    return result

}

async function screenshot({spider, img_name}) {
    // const screenshot_path = `./${img_name}.jpg`
    // await spider.page.screenshot({path: screenshot_path, quality: 30, fullPage: true});
    // console.log(`成功截图---:`, img_name)
}


function func_no_dialog() {
    // window.alert = () => {
    //     console.log(`alert---:`,     111        )
    // };
    // window.confirm = () => {
    //     console.log(`confirm---:`,     111        )
    // };
    // window.prompt = () => {
    //     console.log(`prompt---:`,     111        )
    // };
    // window.onbeforeunload = () => {
    //     console.log(`onbeforeunload---:`,     111        )
    // };
    // // location.href="https://www.baidu.com/"
}


async function func_WebContentsView_show() {
    await WebContentsView_manager[".account1"].setVisible(true)
    await WebContentsView_manager[".account1"].setVisible(false)
}


async function func_no_dialog_before() {
    await this.page.evaluate(() => {
        window.alert = () => {
            console.log(`alert---:`, 111)
        };
        window.confirm = () => {
            console.log(`confirm---:`, 111)
        };
        window.prompt = () => {
            console.log(`prompt---:`, 111)
        };
        window.onbeforeunload = () => {
            console.log(`onbeforeunload---:`, 111)
        };
        // location.href="https://www.baidu.com/"
    })
}

// await spider.page.evaluate(async () => {
//     let element = document.querySelector(".TopicInputAlias-placeholderButton")
//     if (element) {
//         element.click()
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         console.log(`点击-成功---:111`)
//     }
// })