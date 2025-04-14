export default async function webview_start({container, webview_name, partition, style, preload, url}) {
    // 判断是否有容器div,如果容器div内有webview删除旧的webview
    let element_container = await wait_css({desc: "等待容器", css: container})
    document.querySelector(`${container}  webview`)?.remove()

    //容器div种创建webview
    let webview = document.createElement("webview")
    webview.partition = partition
    webview.style = style
    webview.nodeIntegration = true
    webview.contextIsolation = true
    webview.allowpopups = true
    webview.disablewebsecurity = true
    webview.preload = preload
    webview.src = "about:blank"
    webview.useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
    element_container.append(webview)


    // 等待webview创建成功后,添加扩展方法
    await wait_css({desc: "等待webview", css: `${container}   webview`})
    webview['test1'] = test1
    webview['call_eval'] = call_eval
    webview['didStartNavigation'] = didStartNavigation

    function test1() {
        alert('test1')
        console.log(`this:`, this)
        return 'test1'
    }

    async function call_eval(func, params) {
        const funStr = func.toString()
        const paramsStr = params ? JSON.stringify(params) : ""
        const code = `(${funStr})(${paramsStr})`
        // console.log(`params---:`, params)
        // console.log(`code---:`, code)
        return await this.executeJavaScript(code)
    }

    async function didStartNavigation(callback) {
        webview.addEventListener("did-start-navigation", async (event) => {
            // this.webview.addEventListener("dom-ready", async (event) => {
            // this.webview.addEventListener("did-stop-loading", async (event) => {
            // this.webview.addEventListener("did-attach", async (event) => {
            try {
                // this.webview.executeJavaScript(`localStorage.setItem("webviewId","${this.webviewId}"  )   `)
                callback(event)
            } catch (error) {
                console.error(`didStartNavigation---error:`, error)
            }
        })

    }


    console.log(`
  webview文档api-----${webview_name}
  test1               测试test1
  call_eval           执行脚本代码
  openDevTools        打开控制台
  loadURL             加载url
  reload              刷新
  goBack              后退
  goForward           前进
  didStartNavigation  监听导航栏
  `)
    webview.loadURL(url)
    window[webview_name] = webview
    return window[webview_name]
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
