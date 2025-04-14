const {app, session, BrowserWindow} = require("electron")
const router = require('express').Router()
const Spider = require('tool_js_spider/Spider')

router.post('/douyin/video_publish', async (req, resp) => {
    const {partition, path_video, title} = req.body
    const spider = new Spider()
    await spider.wind_start_partition({desc: "启动-spider", partition, show: true, BrowserWindow,})
    await spider.web_goto({desc: "页面-视频发布", url: "https://creator.douyin.com/creator-micro/content/upload"})
    await spider.input_file({desc: "上传-视频文件", css: `input[type]`, files: path_video})
    await spider.input_text({desc: "输入-标题", css: `input[placeholder*='填写作品标题']  `, text: title})
    await spider.click({desc: "点击-发布按钮", css: `div[class*='content-confirm-container-'] button[class*='button-'][class*='primary-']`})


    let element = await spider.css_wait_try({desc: "提交-成功", css: `div[class^='card-head-']`, timeout: 20 * 1000})
    if (element) {
        let result = {code: 200, msg: `成功:发布-抖音-视频`, Uri: req.Uri}
        console.log(JSON.stringify(result))
        resp.json(result)
    } else {
        let result = {code: 400, msg: `失败:发布-抖音-视频`, Uri: req.Uri}
        console.log(JSON.stringify(result))
        resp.json(result)
    }
})

module.exports = router
