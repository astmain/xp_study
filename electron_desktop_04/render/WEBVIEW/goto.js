export default async function goto({desc = "跳转网页", url = ""}) {
    console.log(`WEBVIEW---goto:`, {desc, url})
    await new Promise((resolve) => setTimeout(resolve, 500))//todo 测试等待一下,等待electron_webview_partition生产文件夹消耗时间
    await this.webview.loadURL(url)
}


