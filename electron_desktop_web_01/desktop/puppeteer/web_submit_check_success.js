module.exports = async function web_submit_check_success({desc = '提交成功', css, timeout = 15 * 1000, acc, data, env, tempPath}) {
    try {
        await this.page.waitForSelector(css, {timeout: timeout})
        console.log(`成功:${desc}`, `平台:${data.platform}`, `类型:${data.kind}`, `昵称:${acc.nickName}`  ,`---css:${css}`)

        //// 测试报错
        // desc = "----测试报错---实际是成功的---" + desc
        // throw new Error(desc);

        return true
    } catch (error) {
        // console.error(`报错:${desc}`, `error:`, error)
        ////打包exe 页面page发生了变化 screenshot 会截图异常,占时取消这个函数
        // const screenshot_path = `${tempPath}/${acc.platformName}__${data.kind}__${acc.nickName}__.jpg`
        // await this.page.screenshot({path: screenshot_path, quality: 30, fullPage: true});
        // console.error(`报错:截图路径---web_submit_check_success:`, screenshot_path)
        throw new Error(`报错:${desc}`)
    }
}
