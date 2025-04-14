import WEBVIEW from "./WEBVIEW";

export default async function WEBVIEW_start({css, partition, webviewId, url}) {
    let WEB = new WEBVIEW()
    await WEB.create({css, partition, webviewId, path_preload: preload.PATH.preload})
    await WEB.style({css: "width: 100%; height: 500px; z-index: 100"})
    await WEB.goto({url})
    window["WEB_" + webviewId] = WEB
    return "WEB_" + webviewId
}


