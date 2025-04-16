import './css.css'
export default function min_web() {
  return (
    <>
      <h1>min_web</h1>

      <webview src="https://www.baidu.com/" partition="persist:blank" allowpopups="true" nodeIntegration="true" contextIsolation="true" disablewebsecurity="true" useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"></webview>
    </>
  )
}
