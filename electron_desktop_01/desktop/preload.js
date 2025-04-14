// const fs = require("fs");
// const path = require("path");
const {ipcRenderer, contextBridge} = require("electron");
contextBridge.exposeInMainWorld("preload", {
    // fs: fs, //
    // path: require('path'), //
    // fs_pro: require('fs/promises'), //
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),         //渲染进程发送消息主进程,配合ipcMain.handle使用,会有结果
    on: (channel, callback) => ipcRenderer.on(channel, callback),         //渲染进程监听主进程消息,使用回调函
    send: (channel, data) => ipcRenderer.send(channel, data),             //
    sendToHost: (data) => ipcRenderer.sendToHost("sendToHost_channel", data), //page页和webview通信
})

window.addEventListener('DOMContentLoaded', () => {
    // let script = document.createElement('script')
    // my_script.innerHTML = v
    // document.body.appendChild(my_script)
    inject_script({name: "wait_css", code: wait_css.toString()})
})
//
// const {contextBridge, ipcRenderer} = require('electron')
// contextBridge.exposeInMainWorld('preload', {
//     send: (channel, data) => ipcRenderer.send(channel, data),//
//     on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),//
//     sendToHost: (data) => ipcRenderer.sendToHost("channel", data), //page页和webview通信
// })


function inject_script({name, code}) {
    let script = document.createElement('script')
    script.innerHTML = code
    document.body.appendChild(script)
    console.error(`成功:inject_script---注入:`, name)
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



