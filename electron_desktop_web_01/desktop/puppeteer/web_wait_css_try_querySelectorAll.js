module.exports = async function web_wait_css_try_querySelectorAll({desc, css, timeout = 10 * 1000}) {
    try {
        await this.page.waitForSelector(css, {timeout: timeout})
        // await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
        let elements = await this.page.$$(css)
        console.log(`成功:${desc}`, `web_wait_css_try_querySelectorAll:${css}`)
        return elements
    } catch (error) {
        return []
    }
}

