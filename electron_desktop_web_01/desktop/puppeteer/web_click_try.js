module.exports = async function web_click_try({desc, css, visible = true, timeout = 10 * 1000, timesleep =  1000}) {
    // try {
    //     await this.page.waitForSelector(css, {timeout})
    //     let ele = await this.page.$(css)
    //     console.log(`成功:${desc}`, `web_wait_css_try:${css}`)
    //     await new Promise((resolve) => setTimeout(resolve, 0.5 * 1000))
    //     if (isclick === true) await ele.click()
    //     return ele
    // } catch (error) {
    //     return null
    // }


    try {
        let element = null
        // 尝试获取元素
        try {
            element = await this.page.waitForSelector(css, {timeout, visible: true,})
            // console.log(`尝试获取元素---:`,     111        )
        } catch (error) {
            // console.log(`尝试获取元素---:`,     222        )
        }

        // 如果获取到元素就执行点击
        if (element) {
            await element.click()
            await new Promise((resolve) => setTimeout(resolve, timesleep))
            console.log(`成功:${desc}`, `web_click_try:${css}`)
        } else {
            console.log(`未成功:${desc}`, `web_click_try:${css}`)
        }


        return element
    } catch (error) {
        // console.log(`尝试获取元素---:`,     444        )
    }


}
