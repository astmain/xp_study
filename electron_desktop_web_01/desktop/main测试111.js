const { app, BrowserWindow, WebContentsView } = require('electron')
app.whenReady().then(() => {


    const main_window = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {

        }
    })


    const view1 = new WebContentsView({
        webPreferences: {
            partition: 'persist:account1'
        }
    })

    main_window.contentView.addChildView(view1)
    view1.webContents.userAgent
    view1.webContents.loadURL('https://www.bilibili.com', {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36'})
    view1.setBounds({ x: 0, y: 0, width: 1200, height: 400 })

    const view2 = new WebContentsView({
        webPreferences: {
            partition: 'persist:account2'
        }
    })
    main_window.contentView.addChildView(view2)
    view1.webContents.loadURL('https://www.bing.com', {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36'})
    view2.setBounds({ x: 0, y: 400, width: 1200, height: 400 })

    console.log(main_window.contentView.children)



})