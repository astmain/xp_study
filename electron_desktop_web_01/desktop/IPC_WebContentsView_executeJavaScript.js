const {ipcMain, WebContentsView, webFrameMain, app} = require("electron")

ipcMain.handle("IPC_WebContentsView_executeJavaScript", async function (event, {key, func, args}) {
    require("./IPC_WebContentsView_check_key")({key})//前置检查参数key
    console.log(`IPC_WebContentsView_executeJavaScript--- {key,func,args}:`, {key, func, args})
   await WebContentsView_manager[key].webContents.executeJavaScript(`(${func})()`)
   // await WebContentsView_manager[key].webContents.executeJavaScript(`console.log(111)`)

    // await WebContentsView_manager[key].webContents.executeJavaScript(
    //    `;(function ()       {
    //   let zoomContainer = document.querySelector('html');
    //   zoomContainer.style.transform = "scale(0.1)";
    //
    //   })
    //
    //
    //   ();
    //   `
    // )
    // await WebContentsView_manager[key].setBounds({x:200,y:100,width:150, height:100})

})
