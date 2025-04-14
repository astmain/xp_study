module.exports = async function call_eval(func, params) {
    let funStr = func.toString()
    let paramsStr = params ? JSON.stringify(params) : ''
    let code = `(${funStr})(${paramsStr})`
    return await this.executeJavaScript(code)
}
