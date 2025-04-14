module.exports = async function click({desc, css, timeout = 10000, visible = true}) {
    try {
        const element = await this.page.waitForSelector(css, {timeout: timeout, visible: visible})
        await element.click()

        
        console.log(`成功:`,{desc, css, timeout , visible}, "---click")
        return element
    } catch (error) {
        console.error(`报错:${desc}`, `click-error:`, error)
        throw new Error(`报错:${desc}`)
    }
}
