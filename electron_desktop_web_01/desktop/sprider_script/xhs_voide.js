module.exports = async function douyin_voide({spider}) {

    // await spider.web_goto({desc: "页面跳转", url: "https://creator.douyin.com/creator-micro/content/upload"})
    await spider.web_goto({desc: "页面跳转", url: "https://creator.douyin.com/creator-micro/content/upload"})

    await spider.web_input_files({desc: "上传-视频文件", css: "input[type]", files: ["C:\\Users\\Administrator\\Desktop\\111.mp4"]})
    await spider.web_input_text({desc: "输入-标题", css: ".editor-kit-editor-container  .semi-input-wrapper input", text: "我的视频标题"})
    await spider.web_input_text({desc: "输入-内容", css: ".outerdocbody.editor-kit-outer-container > div", text: "我的视频描述"})


    return {msg: `提交成功`, isok: true, error: ``}
}



