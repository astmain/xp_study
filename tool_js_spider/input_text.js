module.exports = async function web_text({desc, css, text = "默认内容text", timeout = 10000, delay = 100}) {
    try {
        let element = await this.page.waitForSelector(css, {timeout: timeout, visible: true})
        await element.type(text, {delay: delay})
        console.log(`成功:`, {desc, css, text, timeout, delay}, "---input_text")
        return element
    } catch (error) {
        console.error(`报错:${desc}`, `input_text-error:`, error)
        throw new Error(`报错:${desc}`)
    }
}