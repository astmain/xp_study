const {app, BrowserWindow, nativeImage, session, ipcMain, dialog, protocol, globalShortcut, ipcRenderer, contextBridge, Menu, MenuItem, shell, desktopCapturer} = require('electron');





window.addEventListener('DOMContentLoaded', () => {
    // window.axios = require("axios")
    // window.jq = require("jquery")
    // console.log(`DOMContentLoaded---:`, axios)
    // console.log(`DOMContentLoaded---:`, jq)


    // inject_src({desc: 'axios', src: 'https://dev.duochuangkeji.cn:5032/static/js/axios.js'})
    // inject_src({desc: 'jq', src: 'https://dev.duochuangkeji.cn:5032/static/js/jq.js'})
    //
    // function inject_src({desc, src}) {
    //     const my_script = document.createElement('script')
    //     my_script.src = src
    //     document.body.appendChild(my_script)
    //     console.log('成功---引入外部依赖:', desc)
    //
    // }



    let preload = {
        cwd: process.cwd(), //
        // jq: require("jquery"), //
        fs: require("fs"), //
        sendToHost: (channel, data) => ipcRenderer.sendToHost(channel, data), //page页和webview通信
        send: (channel, data) => ipcRenderer.send(channel, data),             //
        invoke: (channel, data) => ipcRenderer.invoke(channel, data),         //渲染进程发送消息主进程,配合ipcMain.handle使用,会有结果
        on: (channel, callback) => ipcRenderer.on(channel, callback),         //渲染进程监听主进程消息,使用回调函数
    }


    console.log(`jq.toString()       ---:`,      require("jquery").toString()        )


    contextBridge.exposeInMainWorld("preload", preload)
})




