export default async function openDevTools() {
    await this.webview.closeDevTools()
    await this.webview.openDevTools()
}





