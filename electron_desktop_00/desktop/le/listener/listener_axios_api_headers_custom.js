let {ipcMain, session} = require("electron")
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


    callback({requestHeaders: details.requestHeaders})
})
