let {ipcMain, session} = require("electron")
require("tool_js_web")
// 监听axios请求头自定义
session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    // console.log('details.url ---:', details.url, details.requestHeaders)

    if (details?.requestHeaders["custom_Cookie"]) {
        details.requestHeaders['Cookie'] = details?.requestHeaders["custom_Cookie"]
    }

    if (details?.requestHeaders["custom_User-Agent"]) {
        details.requestHeaders['User-Agent'] = details?.requestHeaders["custom_User-Agent"]
    }


    if (details?.requestHeaders["headers_custom"]) {
        const headers_custom = JSON.parse(details.requestHeaders["headers_custom"])
        // console.log(`headers_custom===:`, headers_custom)
        for (const key in headers_custom) {
            const value = headers_custom[key]
            // console.log(`listener_axios_api_headers_custom---:`, key, "=", value)
            details.requestHeaders[key] = value
        }
        // console.log(`headers_custom---完成:`,     details.requestHeaders        )
    }


    // 为了解决electron开启nodeIntegration开启node集成后数据没办法事实更新不得以的办法
    if (details.url.includes("22222") && details.url.includes(".vue")) {
        let par = url_parse(details.url)
        if (par?.params?.t) {
            let t = Number(par?.params?.t)
            // console.log(`111---url:`, details.url)
            if (t > g_time) {
                console.log("编辑器代码保存---强制刷新")
                // console.log(`333---getURL:`,  mainWindow.webContents.getURL())
                mainWindow.webContents.reload()
                g_time = t + 100
            }
        }
    }


    callback({requestHeaders: details.requestHeaders})
})
