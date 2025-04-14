module.exports = async function web_close(desc = "关闭-WINDspider.close()") {
    if (this.WINDspider && this.WINDspider.close && this.WINDspider.destroy) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await this.WINDspider.close()
        await this.WINDspider.destroy()
        console.log(`成功:${desc}`)
    } else {
        console.log("WINDspider对象不存在,可能是puppeteer链接")
    }


}
