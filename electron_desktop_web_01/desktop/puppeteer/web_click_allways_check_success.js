module.exports = async function web_click_allways_check_success({desc, css_click, count = 4, timeout = 4 * 1000}) {
    try {
        let isok = false

        // 循环---1点击提交按钮---2判断点击后页面元素
        for (let i = 0; i < count; i++) {
            // 点击提交按钮
            try {

                let element = await this.page.$(css_click)
                if (element) await element.click()
            } catch (error) {
            }

            // 等待元素
            try {
                let element3 = await this.page.waitForSelector("  xpath=//*[contains(text(),'提交成功')] ", {timeout: timeout})
                // let element3 = await this.page.waitForXPath(" //*[contains(text(),'提交成功')] ", {timeout: 4 * 1000})
                let text3 = await element3?.evaluate(el => el.textContent)
                console.log(`text3text3text3---:`, text3)
                isok = true
            } catch (error) {
            }


        }


        if (isok) {
            console.log(`成功:${desc}`, `web_click_allways_check_success`)
        } else {
            console.error(`报错:${desc}`, `web_click_allways_check_success:`, "等待超时了", `count:${count}`, `timeout:${timeout}`)
            throw new Error(`报错:${desc},等待超时了`)
        }


        console.log(`成功:${desc}`, `web_click_allways_check_success}`)
    } catch (error) {
        console.error(`报错:${desc}`, `error:`, error)
        throw new Error(`报错:${desc}`)
    }
}
