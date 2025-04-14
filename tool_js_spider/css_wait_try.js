module.exports = async function css_wait_try({desc, css, timeout = 10 * 1000, isclick = false}) {
    try {
        const element=await this.page.waitForSelector(css, {timeout})
        console.log(`成功:`, {desc, css, timeout}, "---css_wait_try")
        return element
    } catch (error) {
        return null
    }
}
