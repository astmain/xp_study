module.exports = async function web_input_text({desc, css, text = "默认内容text", visible = true, isclear = true, timesleep = 1000, isclick = true, paste = false, delay = 0, timeout = 10 * 1000}) {
    try {
        let element = await this.page.waitForSelector(css, {timeout: timeout, visible: visible})


        //点击一下元素
        if (isclick) {
            try {
                await element.click(css)
            } catch (error) {

            }
        }


        // # 清空内容
        if (isclear === true) {
            await this.page.keyboard.down('Control')
            await this.page.keyboard.press('a')
            await this.page.keyboard.up('Control')
            await this.page.keyboard.press('Backspace')
        }

        // 长文本复制粘贴输入
        if (paste) {
            // await this.page.evaluate((text) => {
            //     const input = document.createElement('input')
            //     document.body.appendChild(input)
            //     input.value = text
            //     input.focus()
            //     input.select()
            //     document.execCommand('copy')
            //     document.body.removeChild(input)
            // },text)
            // await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
            // // await element.focus()
            // await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
            // await this.page.keyboard.down('Control')
            // await this.page.keyboard.press('v')
            // await this.page.keyboard.up('Control')
            new Error("长文本复制粘贴输入---测试阶段请不要使用,因为部分网页不适用")

        } else {
            await element.type(text, {delay: delay})
        }

        console.log(`成功:${desc}`, `web_input_text:${css}`, `isclear:${isclear}`, `isclick:${isclick}`, `paste:${paste}`, `text:${text}`)
        await new Promise((resolve) => setTimeout(resolve,  1000))
        return element
    } catch (error) {
        console.error(`报错:${desc}`, `web_input_text-error:`, error)
        throw new Error(`报错:${desc}`)
    }
}