export default async function override_navigator({callback = (event) => 1}) {
    this.webview.addEventListener("did-start-navigation", async (event) => {
        // this.webview.addEventListener("dom-ready", async (event) => {
        // this.webview.addEventListener("did-stop-loading", async (event) => {
        // this.webview.addEventListener("did-attach", async (event) => {
        try {
            this.webview.executeJavaScript(`localStorage.setItem("webviewId","${this.webviewId}"  )   `)
            callback(event)
        } catch (error) {
            console.log(`override_navigator---catch---error:`, error)
        }
    })

}