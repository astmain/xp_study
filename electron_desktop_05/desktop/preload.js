const {app, BrowserWindow, nativeImage, session, ipcMain, dialog, protocol, globalShortcut, ipcRenderer, contextBridge, Menu, MenuItem, shell, desktopCapturer} = require('electron');
const fs = require('fs');


preload()

async function preload() {

    contextBridge.exposeInMainWorld("preload", {

        fs: fs, //
        path: require('path'), //
        fs_pro: require('fs/promises'),

        PATH:async ()=> await ipcRenderer.invoke("IPC_get_PATH"),
        // PATH:ipcRenderer.invoke("IPC_get_PATH"),


        session: session,


        invoke: (channel, data) => ipcRenderer.invoke(channel, data),         //渲染进程发送消息主进程,配合ipcMain.handle使用,会有结果
        on: (channel, callback) => ipcRenderer.on(channel, callback),         //渲染进程监听主进程消息,使用回调函

        send: (channel, data) => ipcRenderer.send(channel, data),             //
        sendToHost: (data) => ipcRenderer.sendToHost("channel", data), //page页和webview通信
    })
}


