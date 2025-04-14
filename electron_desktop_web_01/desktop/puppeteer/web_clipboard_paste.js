module.exports = async function web_clipboard_paste({desc="剪贴板-粘贴", css, timeout = 10000}) {
    try {
        const element = await this.page.waitForSelector(css, {timeout: timeout, visible: true})
        await element.click()
        await this.page.keyboard.down('Control')
        await this.page.keyboard.press('v')
        await this.page.keyboard.up('Control')


        console.log(`成功:${desc}`, `web_clipboard_paste:${css}`)
        return element
    } catch (error) {
        console.error(`报错:${desc}`, `error:`, error)
        throw new Error(`报错:${desc}`)
    }
}