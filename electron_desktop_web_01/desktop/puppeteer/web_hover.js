module.exports = async function web_hover({desc, css, timeout = 10 * 1000, visible = true}) {
    try {
        let element = await this.page.waitForSelector(css, {timeout: timeout, visible: visible})
        await element.hover()
        console.log(`成功:${desc}`, `web_hover:${css}`)
        return element
    } catch (error) {
        console.error(`报错:${desc}`, `web_hover-error:`, error)
        throw new Error(`报错:${desc}`)
    }
}



