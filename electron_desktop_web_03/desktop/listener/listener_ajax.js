let {ipcMain, session} = require("electron")
// ON_ajax监听ajax请求_可以设置cookie和ua
session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    // console.log('details.url ---:', details.url, details.requestHeaders)
    if (details?.requestHeaders["custom_Cookie"]) {
        details.requestHeaders['Cookie'] = details?.requestHeaders["custom_Cookie"]
        // console.log(`ON_ajax---{url,custom_Cookie}:`, {url: details.url, setCookie: details?.requestHeaders["custom_Cookie"]})
    }
    if (details?.requestHeaders["custom_User-Agent"]) {
        details.requestHeaders['User-Agent'] = details?.requestHeaders["custom_User-Agent"]
        // console.log(`ON_ajax---{url,custom_User-Agent}:`, {url: details.url, setCookie: details?.requestHeaders["custom_User-Agent"]})
    }
    callback({requestHeaders: details.requestHeaders})
})
