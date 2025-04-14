module.exports = async function web_click({desc, css, timeout = 10 * 1000, visible = false, sleeptime = 1000}) {
    try {
        // const element = await this.page.waitForSelector(css, {timeout: timeout, visible: visible})
        const element = await this.page.waitForSelector(css, {timeout: timeout})
        // const element   = await this.page.waitForSelector(css, {timeout: timeout})

        await element.click()
        console.log(`成功:${desc}`, `web_click:${css}`)
        await new Promise((resolve) => setTimeout(resolve, sleeptime))
        return element
    } catch (error) {
        console.error(`报错:${desc}`, `web_click-error:`, error)
        throw new Error(`报错:${desc}`)
    }
}
