module.exports = async function web_wait_css({desc, css, timeout = 10 * 1000}) {
    try {
        await this.page.waitForSelector(css, {timeout : timeout})
        let ele = await this.page.$(css)
        console.log(`成功:${desc}`, `web_wait_css:${css}`)
        await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
        return ele
    } catch (error) {
        console.error(`报错:${desc}`, `web_wait_css-error:`, error)
        throw   new Error(`报错:${desc}`)
    }
}



