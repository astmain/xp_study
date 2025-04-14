module.exports = async function web_click_allways({desc, css, timeout =1000}) {
    try {
        function func({desc, css, timeout}) {
            console.log(`web_click_allways:不断点击111`, `desc:${desc}`, `css:${css}`, `timeout:${timeout}`)
            setInterval(() => {
                let element = null
                if (css.includes("xpath=")) {
                    let xpathExpression = css.replace("xpath=", "")
                    let {singleNodeValue} = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                    element = singleNodeValue ? singleNodeValue : null
                } else {
                    element = document.querySelector(css)
                }



                let rect = element?.getBoundingClientRect()//元素宽高
                if (element && rect && rect.width > 0 && rect.height > 0) {
                    element.click()
                    console.log(`web_click_allways:不断点击222`, `css:${css}`, `css:${css}`, `timeout:${timeout}`)
                }
            }, timeout)
        }

        await this.page.evaluate(func, {desc, css, timeout})
        console.log(`成功:${desc}`, `web_click_allways:${css}`)
    } catch (error) {
        console.error(`报错:${desc}`, `web_click_allways-error:`, error)
        throw new Error( `报错:${desc}` )
    }
}
