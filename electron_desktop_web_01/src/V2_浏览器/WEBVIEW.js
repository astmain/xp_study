// https://juejin.cn/post/7202413628808511548
let aaa = class WEBVIEW {
    constructor() {
        this.webview = null
        this.webviewId = null
    }

    async goto({desc = "跳转网页", url = ""}) {
        await this.webview.loadURL(url)
    }


    async style({css}) {
        this.webview.style = css
    }

    async openDevTools() {
        await this.webview.closeDevTools()
        await this.webview.openDevTools()

    }


    async eval({func = "()=>{}", params}) {
        const funStr = func.toString()
        const paramsStr = params ? JSON.stringify(params) : ""
        const code = `(${funStr})(${paramsStr})`
        console.log(`params---:`, params)
        console.log(`code---:`, code)
        return this.webview.executeJavaScript(code)

    }


    async override_navigator({callback = (event) => 1}) {
        this.webview.addEventListener("did-start-navigation", async (event) => {
            // this.webview.addEventListener("dom-ready", async (event) => {
            // this.webview.addEventListener("did-stop-loading", async (event) => {
            // this.webview.addEventListener("did-attach", async (event) => {
            try {
                this.webview.executeJavaScript(`localStorage.setItem("webviewId","${this.webviewId}"  )   `)
                callback(event)
            } catch (error) {
                console.log(`override_navigator---catch---error:`, error)
            }
        })

    }


    async create({desc = "初始化webview", css = ".webview_wrapper", partition, webviewId, style = {css: "width: 100%; height: 400px; z-index: 100"}}) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
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

        webview.preload = preload.PATH.preload
        webview.useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
        let webview_wrapper = await wait_css({desc, css})
        console.log(`111---{desc, css}:`, {desc, css})
        webview_wrapper.append(webview)
        let webview222222 = await wait_css({desc, css: css + "  " + "webview"})
        this.webview = webview222222
        return this
    }


}

export default aaa;


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


