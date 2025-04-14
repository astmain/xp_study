module.exports = function IPC_WebContentsView_check_key({key}) {
    Object.hasOwn(globalThis.WebContentsView_manager, key)
    if (!Object.hasOwn(globalThis.WebContentsView_manager, key)) {
        const result = `参数检查---IPC_WebContentsView_check_key---globalThis.WebContentsView_manager---不存在key---${key}`
        console.error(result)
        throw Error(result)
    } else {
        return true
    }
}





