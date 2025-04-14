export default async function goto({desc = "跳转网页", url = ""}) {
    console.log(`WEBVIEW---goto:`, {desc, url})
    await this.webview.loadURL(url)
}


