module.exports = async function web_input_files({desc, css, files = [], timeout = 10 * 1000}) {

    try {
        const element = await this.page.waitForSelector(css, {timeout: timeout})
        await element.uploadFile(...files)
        console.log(`成功:${desc}`, `web_input_files:${css}`)
        // await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
        return element
    } catch (error) {
        console.error(`报错:${desc}`, `web_input_files-error:`, error)
        throw new Error(`报错:${desc}`)
    }


}