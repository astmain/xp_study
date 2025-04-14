module.exports = async function goto(url) {
    await this.loadURL(url)
    for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        let isok = await wait_div({ webview: this })
        // console.log('webview---goto---isok', isok)
        if (isok) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return url
        } else {
            alert('webview---goto---等待超时')
            throw Error('webview---goto---等待超时')
        }
    }

    // this.addEventListener('dom-ready', async (event) => {
    //     debugger
    //     resolve(url)
    // })

    // this.addEventListener('did-stop-loading', async (event) => {
    //     debugger
    //     resolve(url)
    // })
}

async function wait_div({ webview }) {
    for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        try {
            let isok = await webview.call_eval(async () => {
                let body = document?.querySelector('body')
                if (body) {
                    return true
                }
            })
            return isok
        } catch (error) {}
    }
}
