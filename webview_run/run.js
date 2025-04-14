// module.exports = async function run({ partition = 'persist:blank', url = 'about:blank', container = 'body',  className="web__", is_delete = true, style = 'width:100%; height: 500px; z-index: 100;border: 1px solid red;' }) {
module.exports = async function run({ partition = 'persist:blank', url = 'about:blank', container = 'body',  className="web__", is_delete = true, 

style = 	`box-sizing: border-box;  width:100%; height: 500px; z-index: 100;border: 1px solid red;

overflow: auto;        
   
		
		
		
			`


}) {
    return new Promise(async (resolve, reject) => {
        let parent = document.querySelector(container)

        if (is_delete) {
            let webview_old = document.querySelector(`${container}  webview`)
            if (webview_old) webview_old.remove()
        }

        let webview = document.createElement('webview')
        webview.partition = partition
        webview.className=className
        webview.src = url
        webview.style = style
        webview.nodeIntegration = true
        webview.contextIsolation = true
        webview.allowpopups = true
        webview.disablewebsecurity = true
        webview.useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36'
        parent.append(webview)
        // window['web__'] = webview
        webview.addEventListener('dom-ready', async () => {
            resolve(webview)
        })
        
    })
}
