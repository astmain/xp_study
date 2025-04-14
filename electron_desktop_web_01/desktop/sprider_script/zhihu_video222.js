module.exports = async function zhihu_video({spider}) {


    await spider.web_goto({desc: "页面跳转", url: "https://www.zhihu.com/zvideo/upload-video"})
    await spider.web_input_files({desc: "上传视频文件", css: ".VideoUploadButton-fileInput", files: ["C:\\Users\\Administrator\\Desktop\\111.mp4"]})


    var content = "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    await spider.web_input_text({desc: "输入内容", css: "textarea[class*='Input ']", text: content})

    await spider.web_click({desc: "随便点击", css: "body"})
    var content = "2222222222"
    await spider.web_input_text({desc: "输入内容", css: "textarea[class*='Input ']", text: content})

    let result = {msg: `提交成功`, isok: true, error: ``}
    console.log(`result---:`, result)
    return result

}
