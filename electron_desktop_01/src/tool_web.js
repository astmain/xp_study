window.set_cookies = set_cookies
window.get_cookies = get_cookies
window.get_cookies_str = get_cookies_str
window.get_localStorage = get_localStorage
window.set_localStorage = set_localStorage
window.wait_css = wait_css


async function set_cookies({url, partition, cookies}) {
    // console.log(`set_cookies---111:`, {url, partition, cookies})

    if (cookies.length > 1) {
    } else {
        cookies = []
    }

    for (let i = 0; i < cookies.length; i++) {
        let item = cookies[i]
        let ele = {...item, url}
        try {
            await electron.session.fromPartition(partition).cookies.set(ele)
            // console.log(`set_cookies---222:`, url, partition, ele)
        } catch (error) {
            console.error(`异常:set_cookies---ele`, ele)
        }
    }
}

async function get_cookies({url, partition}) {
    const cookies = await electron.session.fromPartition(partition).cookies.get({url})
    return cookies
}

async function get_cookies_str({url, partition}) {
    let cookies = await electron.session.fromPartition(partition).cookies.get({url})
    let cookies_str = ""
    if (Object.prototype.toString.call(cookies) === '[object Array]') {
        for (let i = 0; i < cookies.length; i++) {
            let ele = cookies[i]
            cookies_str += ele.name + "=" + ele.value + "; "
        }
    } else {
        throw new Error('函数cookie_arr_to_str的参数必须是数组对象');
    }
    return cookies_str
}

async function get_localStorage({webview, url}) {
    try {
        return await run({webview, url})
    } catch (error) {
        return await run({webview, url})
    }

    async function run() {
        await webview.goto(url)
        let store = await webview.executeJavaScript(`(${async function () {
            async function wait_css({desc, css}) {
                for (let i = 0; i < 1000; i++) {
                    await new Promise((resolve) => setTimeout(resolve, 10))
                    let element = null
                    if (css.includes('xpath')) {
                        let xpathExpression = css.replace('xpath', '')
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

            await wait_css({desc: "get_localStorage-等待元素", css: "body"})
            return JSON.parse(JSON.stringify(window.localStorage))
        }})()`)
        // console.log(`get_localStorage---成功:`, store)
        return store
    }

}

async function set_localStorage({webview, url, store}) {
    try {
        await run({webview, url, store})
    } catch (error) {
        await run({webview, url, store})
    }

    async function run({webview, url, store}) {
        let store_str = JSON.stringify(store)
        await webview.goto(url)
        let isok = await webview.executeJavaScript(`(${async function (store) {
            async function wait_css({desc, css}) {
                for (let i = 0; i < 1000; i++) {
                    await new Promise((resolve) => setTimeout(resolve, 10))
                    let element = null
                    if (css.includes('xpath')) {
                        let xpathExpression = css.replace('xpath', '')
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

            await wait_css({desc: "set_localStorage---等待元素", css: "body"})
            for (const key in store) {
                let val = store[key]
                localStorage.setItem(key, val)
                console.log(`localStorage_set---key:`, {key, val})
            }
            // console.log(`set_localStorage---成功`, store)
            return true
        }})(${store_str})`)
    }


}

async function wait_css({desc, css}) {
    for (let i = 0; i < 1000; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10))
        let element = null
        if (css.includes('xpath')) {
            let xpathExpression = css.replace('xpath', '')
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

export default 1111
