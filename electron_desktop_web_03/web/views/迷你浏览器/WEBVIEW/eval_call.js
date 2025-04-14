export default async function eval_call(func, params) {
    const funStr = func.toString()
    const paramsStr = params ? JSON.stringify(params) : ""
    const code = `(${funStr})(${paramsStr})`
    // console.log(`params---:`, params)
    console.log(`code---:`, code)

    return await this.webview.executeJavaScript(code)
}