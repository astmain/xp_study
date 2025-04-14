module.exports = async function web_goto({desc = "默认页面跳转", url, ishref = false}) {
    try {


        if (ishref === true) {
            await this.page.evaluate((url) => location.href = url,url)
        } else {
            await this.page.goto(url)
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(`成功:${desc}`, `web_goto---{desc,url}`, {desc, url})
        return this
    } catch (error) {
        console.error(`报错:${desc}`, `web_goto---{desc,url}`, {desc, url}, "error", error)
        throw new Error(`报错:${desc}`)
    }
}
