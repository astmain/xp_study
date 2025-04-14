module.exports = async function web_wait_css_try({desc, css, timeout = 10 * 1000, isclick = false}) {
    try {
        await this.page.waitForSelector(css, {timeout})
        let ele = await this.page.$(css)
        console.log(`成功:${desc}`, `web_wait_css_try:${css}`)
        // await new Promise((resolve) => setTimeout(resolve, 0.5 * 1000))
        if (isclick === true) await ele.click()
        return ele
    } catch (error) {
        return null
    }
}

