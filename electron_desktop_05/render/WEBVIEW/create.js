export default async function create({desc = "初始化webview", css = ".webview_wrapper", partition, webviewId, path_preload, style = {css: "width: 100%; height: 400px; z-index: 100"}}) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 删除旧的webviewId
    const element = document.querySelector("#" + webviewId);
    if (element) element.remove();


    await  wait_css({desc:'判断容器是否存在',css:css})



    // 参数校验
    if (((typeof partition === "string") && partition.includes("persist:")) === false) {
        // todo 需要判断文件夹是否存在
        alert(`partition---参数错误`)
        throw Error(`partition---参数错误`)
    }
    if (((typeof webviewId === "string") && webviewId.length >= 1) === false) {
        alert(`webviewId---参数错误`)
        throw Error(`webviewId---参数错误`)
    }

    this.webviewId = webviewId
    let webview = document.createElement("webview")
    this.webview = webview
    webview.id = webviewId
    webview.partition = partition
    webview.src = "about:blank"
    webview.style = style
    webview.nodeIntegration = true
    webview.contextIsolation = true
    webview.allowpopups = true
    webview.disablewebsecurity = true

    // webview.addEventListener('click', function(event) {
    //     event.stopPropagation();
    // });
    // console.log(`preload.PATH.preload---:`,     preload.PATH.preload        )
    // webview.preload = preload.PATH.preload
    webview.preload = path_preload
    webview.useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
    let webview_wrapper = await wait_css({desc, css})
    // console.log(`111---{desc, css}:`, {desc, css})
    webview_wrapper.append(webview)
    let webview222222 = await wait_css({desc, css: css + "  " + "webview"})
    this.webview = webview222222
    return this
}



async function wait_css({desc, css}) {
    for (let i = 0; i < 1000; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10))
        let element = null
        if (css.includes("xpath")) {
            let xpathExpression = css.replace("xpath", "")
            let {singleNodeValue} = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            element = singleNodeValue ? singleNodeValue : null
        } else {
            element = document.querySelector(css)
        }
        if (element) {
            console.log(`成功:${desc}---wait_css---css:${css}`)
            return element
        }
    }
    throw Error(`失败:${desc}---wait_css---css:${css}`)
}


async function wait_css_click({desc, css}) {
    for (let i = 0; i < 1000; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10))
        let element = null
        if (css.includes("xpath")) {
            let xpathExpression = css.replace("xpath", "")
            let {singleNodeValue} = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            element = singleNodeValue ? singleNodeValue : null
        } else {
            element = document.querySelector(css)
        }

        if (element) {
            element.click()
            console.log(`成功:${desc}---wait_css_click---css:${css}`, `{desc, css}:`, {desc, css})
            return element
        }
    }
    throw Error(`成功:${desc}---wait_css_click---css:${css}`)
}
